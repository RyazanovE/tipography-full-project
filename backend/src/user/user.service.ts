import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindOptionsSelect, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDtoType } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailService } from 'src/email/email.service';
import { randomUUID } from 'crypto';
import { Role } from 'src/auth/enums/role.enum';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @Inject(EmailService) private emailService: EmailService,
    @Inject(CartService) private cartService: CartService
  ) {}

  async updatePassword(dto: {
    newPassword: string;
    token: string;
  }) {
    const user = await this.userRepo.findOneBy({
      passwordResetToken: dto.token,
    });

    if (!user) {
      throw new BadRequestException('Пользователь с таким токеном не найден');
    }

    if (
      !user.passwordResetTokenExpires ||
      user.passwordResetTokenExpires < new Date()
    ) {
      const { token: newToken, expiresAt } = this.generateResetPasswordToken();

      user.passwordResetToken = newToken;
      user.passwordResetTokenExpires = expiresAt;

      await this.userRepo.save(user);

      await this.sendResetPasswordEmail(user.email, newToken, user.name);

      return {
        message:
          'Ссылка просрочена, новая ссылка на восстановление пароля выслана на почту',
      };
    }

    user.passwordResetToken = null;
    user.passwordResetTokenExpires = null;
    user.password = dto.newPassword;

    await this.userRepo.save(user);


    return { message: 'Пароль успешно обновлен' };
  }

  async confirmEmail(token: string) {
    const user = await this.userRepo.findOneBy({ confirmToken: token });

    if (user?.role !== Role.GUEST) {
      throw new BadRequestException('Email уже подтверждён');
    }

    if (!user) {
      throw new BadRequestException('Пользователь с таким токеном не найден');
    }

    // Проверяем, истек ли токен
    if (!user.confirmTokenExpires || user.confirmTokenExpires < new Date()) {
      // Генерируем новый токен и обновляем время его истечения
      const { token: newToken, expiresAt } = this.generateConfirmationToken();

      user.confirmToken = newToken;
      user.confirmTokenExpires = expiresAt;

      await this.userRepo.save(user);

      await this.sendResetPasswordEmail(user.email, newToken, user.name);

      return { message: 'Токен истек. Новый токен был отправлен на ваш email' };
    }

    // Если токен валидный, подтверждаем email
    user.role = Role.USER;
    user.confirmTokenExpires = null;
    user.confirmToken = null;

    await this.userRepo.save(user);

    return { message: 'Email успешно подтверждён' };
  }

  private generateConfirmationToken(): { token: string; expiresAt: Date } {
    const token = randomUUID();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 часа
    return { token, expiresAt };
  }

  private generateResetPasswordToken() {
    const token = randomUUID();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 минут
    return { token, expiresAt };
  }

  async resetPassword(email: string) {
    const user = await this.userRepo.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('Пользователь с таким email не найден');
    }
    const { token, expiresAt } = this.generateResetPasswordToken();

    user.passwordResetTokenExpires = expiresAt;
    user.passwordResetToken = token;

    await this.userRepo.save(user);

    await this.sendResetPasswordEmail(user.email, token, user.name);

    return { message: 'Ссылка для сброса отправлена на email' };
  }

  private async sendResetPasswordEmail(
    email: string,
    token: string,
    name?: string,
  ) {
    const resetLink = `${process.env.NODE_ENV === 'production' ? process.env.PASSWORD_RESET_LINK_PROD : process.env.PASSWORD_RESET_LINK}?token=${token}`;
    const expiresMinutes = 15;

    await this.emailService.sendEmail(
      email,
      'Восстановление пароля',
      'Пожалуйста, перейдите по ссылке для сброса пароля',
      `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #333;">Здравствуйте, ${name || 'пользователь'}!</h2>
          <p>Вы запросили сброс пароля для вашего аккаунта. Нажмите на кнопку ниже, чтобы установить новый пароль:</p>
          <a href="${resetLink}" 
            style="display: inline-block; margin-top: 20px; padding: 10px 20px; 
                    background-color: #2196F3; color: white; text-decoration: none; 
                    border-radius: 5px;">
            Сбросить пароль
          </a>
          <p style="margin-top: 20px;">
            Ссылка действительна в течение ${expiresMinutes} минут.
          </p>
          <p style="margin-top: 30px; font-size: 12px; color: #999;">
            Если вы не запрашивали сброс пароля, пожалуйста, проигнорируйте это письмо 
            или сообщите в службу поддержки.
          </p>
        </div>
      `,
    );
  }

  private async sendConfirmationEmail(
    email: string,
    token: string,
    name?: string,
  ) {
    const confirmLink = `${process.env.NODE_ENV === 'production' ? process.env.EMAIL_CONFIRM_LINK_PROD : process.env.EMAIL_CONFIRM_LINK}?token=${token}`;

    const siteName = 'Временное название'

    await this.emailService.sendEmail(
      email,
      'Подтверждение регистрации на сайте ' + siteName,
      'Подтвердите вашу регистрацию',
      `
        <div style="font-family: Arial, sans-serif; padding: 24px; background-color: #f4f4f4; color: #333;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
            <h2 style="color: #2c3e50;">Добро пожаловать${name ? ', ' + name : ''}!</h2>
            <p style="line-height: 1.6;">
              Благодарим вас за регистрацию на <strong>${siteName}</strong>.
              Для завершения процесса и активации вашей учетной записи, пожалуйста, подтвердите ваш email, нажав на кнопку ниже.
            </p>
            <a href="${confirmLink}" style="display: inline-block; margin: 24px 0; padding: 12px 24px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Подтвердить Email
            </a>
            <p style="font-size: 14px; color: #555;">
              Ссылка для подтверждения будет активна в течение <strong>15 минут</strong>. Если вы не регистрировались на нашем сайте, просто проигнорируйте это письмо.
            </p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="font-size: 12px; color: #999;">
              С уважением, команда <strong>${siteName}</strong><br>
              Это автоматическое письмо, пожалуйста, не отвечайте на него.
            </p>
          </div>
        </div>
      `,
    )
    
  }

  async create(dto: CreateUserDtoType, guestId: string) {
    const existingUser = await this.userRepo.findOneBy({ email: dto.email });
    if (existingUser) {
      throw new BadRequestException(
        'Пользователь с таким email уже существует',
      );
    }

    const { token, expiresAt } = this.generateConfirmationToken();

    const user = this.userRepo.create({
      ...dto,
      confirmTokenExpires: expiresAt,
      confirmToken: token,
    });

    await this.migrateCartItems(guestId, user);

    await this.userRepo.save(user);

    await this.sendConfirmationEmail(dto.email, token, dto.name);

    return { message: 'Письмо для подтверждения отправлено' };
  }

  async updateHashedRefreshToken(userId: number, hashedRefreshToken?: string) {
    return await this.userRepo.update({ id: userId }, { hashedRefreshToken });
  }

  async migrateCartItems(guestId: string, user: User) {
    return await this.cartService.migrateCartItems(guestId, user);
  }

  async findOne(id: number, withRefreshToken?: boolean) {
    const selectBase = {
      email: true,
      role: true,
      id: true,
      name: true,
      phone: true,
      address: {
        city: true,
        street: true,
        house: true,
        room: true,
        comment: true,
      },
    };
  
    const selectFields: FindOptionsSelect<User> = withRefreshToken
      ? { ...selectBase, hashedRefreshToken: true }
      : selectBase;
  
    const user = await this.userRepo.findOne({
      where: { id },
      select: selectFields,
    });
  
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
  
    return user;
  }
  

  async findByEmail(email: string) {
    return await this.userRepo.findOne({ where: { email } });
  }

  async findAll() {
    return await this.userRepo.find();
  }

  async update(id: number, dto: UpdateUserDto) {
    return await this.userRepo.update({ id }, dto);
  }

  async delete(id: number) {
    return await this.userRepo.delete({ id });
  }
}
