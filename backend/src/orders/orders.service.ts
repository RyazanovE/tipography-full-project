import {
  Injectable,
  BadRequestException,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CartItem } from 'src/cart/entities/cart_item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserService } from 'src/user/user.service';
import { EmailService } from 'src/email/email.service';
import { PaginationQueryDto } from './dto/get-orders.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @Inject(UserService) private userService: UserService,
    @Inject(EmailService) private emailService: EmailService,
  ) {}

  async createOrder(dto: CreateOrderDto, guestId?: string, userId?: number) {
    if (!userId && !dto.clientInfo.email) {
      throw new BadRequestException('Email обязателен для гостей');
    }
    const where: FindManyOptions<CartItem>['where'] = {};

    if (guestId !== undefined) where.guestId = guestId;
    if (userId !== undefined) where.user = { id: userId };

    const cartItems = await this.cartItemRepository.find({ where });

    if (!cartItems.length) {
      throw new BadRequestException('Корзина пуста');
    }

    const user = userId ? await this.userService.findOne(userId) : null;

    const order = this.orderRepository.create({
      items: cartItems,
      status: 'pending',
      info: dto,
      user: user ?? null,
    });

    await this.orderRepository.save(order);

    // очистить корзину
    await this.cartItemRepository.remove(cartItems);

    const totalSum = cartItems.reduce((acc, item) => acc + item.options.sum, 0);

    await this.sendConfirmationEmail(order, totalSum);

    return {
      orderNumber: order.orderNumber,
      email: order.info.clientInfo.email,
    };
  }

  async createFastOrder(dto: {
    phone: string;
    email: string;
    name: string;
    contactMethod: 1 | 2 | 3 | 4;
    files: { filename: string }[];
  }) {
    const payload = {
      items: dto.files?.map((file) => ({
        fileNames: [file.filename],
      })) as CartItem[],
      status: 'pending',
      info: {
        recieverInfo: {
          name: dto.name,
          phone: dto.phone,
          email: dto.email,
        },
        deliveryInfo: {
          deliveryMethod: dto.contactMethod,
          address: null,
          tkInfo: null,
        },
      },
    };

    const order = await this.orderRepository.create(payload as any);
    return order;
  }

  async getOrders(userId: number, paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;

    const [items, total] = await this.orderRepository.findAndCount({
      where: { user: { id: userId } },
      skip: offset,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      items,
      total,
      limit,
      offset,
    };
  }

  async getMockups(userId: number) {
    const orders = await this.getOrders(userId, {});

    const mockups = orders.items.map((order) => {
      const fileNames: string[] = [];

      order.items.forEach((item) => {
        if (item.fileNames) {
          fileNames.push(...item.fileNames);
        }
      });

      return fileNames;
    });
    return Array.from(new Set(mockups.flat()));
  }

  async getAllCurrentOrders(
    userId: number,
    paginationQuery: PaginationQueryDto,
  ) {
    const { limit, offset } = paginationQuery;

    const [items, total] = await this.orderRepository.findAndCount({
      where: {
        user: { id: userId },
        status: In(['pending', 'processing']),
      },
      skip: offset,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      items,
      total,
      limit,
      offset,
    };
  }

  async getOrdersHistory(userId: number, paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;

    const [items, total] = await this.orderRepository.findAndCount({
      where: {
        user: { id: userId },
        status: In(['completed']),
      },
      skip: offset,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      items,
      total,
      limit,
      offset,
    };
  }

  async getOrder(orderNumber: string, email?: string) {
    const orders = await this.orderRepository.findBy({ orderNumber });
    const order = orders.find((o) => o.info?.clientInfo?.email === email);

    if (!order) {
      throw new NotFoundException('Заказ не найден');
    }

    return order;
  }

  async sendConfirmationEmail(order: Order, totalSum: number) {
    const {
      orderNumber,
      info: {
        clientInfo: { fio, email },
        deliveryInfo: { address },
      },
      createdAt,
    } = order;

    await this.emailService.sendEmail(
      email,
      'Подтверждение заказа',
      'Ваш заказ успешно оформлен',
      `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Здравствуйте, ${fio || 'уважаемый клиент'}!</h2>
        <p>Благодарим вас за заказ в нашем магазине. Вот детали вашего заказа:</p>
        
        <div style="margin: 20px 0; padding: 15px; background-color: white; border-radius: 5px; border: 1px solid #eee;">
          <h3 style="margin-top: 0; color: #2196F3;">Заказ #${orderNumber}</h3>
          <p><strong>Дата:</strong> ${createdAt}</p>
          <p><strong>Сумма:</strong> ${totalSum}</p>
          <p><strong>Доставка:</strong> ${address}</p>
        </div>
    
    
        <p>Мы уведомим вас, когда заказ будет передан в службу доставки.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <h3 style="margin-bottom: 10px;">Контакты службы поддержки</h3>
          <p style="margin: 5px 0;"><strong>Телефон:</strong> 453453534535345</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> XHjyL@example.com</p>
        </div>
    
        <p style="margin-top: 30px; font-size: 12px; color: #999;">
          Это письмо сформировано автоматически. Пожалуйста, не отвечайте на него.
        </p>
      </div>
    `,
    );
  }
}
