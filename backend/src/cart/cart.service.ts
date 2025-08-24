import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CartItem } from './entities/cart_item.entity';
import { User } from 'src/user/entities/user.entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private readonly repo: Repository<CartItem>,
  ) {}

  async getUserCart(guestId: string, userId: number) {
    const where: FindManyOptions<CartItem>['where'] = {};

    if (guestId !== undefined) where.guestId = guestId;
    if (userId !== undefined) where.user = { id: userId };
    

    return this.repo.find({
      where,
      select: ['id', 'type', 'options', 'quantity', 'fileNames'],
      order: { createdAt: 'DESC' },
    });
  }

  async editQuantity(quantity: number, id: number, questId?: string, userId?: number) {
    const where: FindManyOptions<CartItem>['where'] = {};

    if (questId !== undefined) where.guestId = questId;
    if (userId !== undefined) where.user = { id: userId };
    where.id = id;

    return this.repo.update(where, { quantity });
  }

  async getCartItemsAmount(guestId?: string, userId?: number) {
    const where: FindManyOptions<CartItem>['where'] = {};

    if (guestId !== undefined) where.guestId = guestId;
    if (userId !== undefined) where.user = { id: userId };

    return this.repo.count({ where });
  }

  async addToCart(
    type: string,
    options: Record<string, any>,
    fileNames: string[],
    guestId?: string,
    userId?: number,
  ) {
    if (userId) {
      return this.repo.save({ user: { id: userId }, type, options, fileNames });
    } else {
      return this.repo.save({ guestId, type, options, fileNames });
    }
  }

  async migrateCartItems(guestId: string, user: User) {
    const guestItems = await this.repo.find({
      where: { guestId },
    });

    for (const item of guestItems) {
      item.user = user;
      item.guestId = null;
      await this.repo.save(item);
    }
  }

  async removeItem(itemId: number, guestId?: string, userId?: number, ) {
    const where: FindManyOptions<CartItem>['where'] = {};

    if (guestId !== undefined) where.guestId = guestId;
    if (userId !== undefined) where.user = { id: userId };
    where.id = itemId;

    const item = await this.repo.findOneBy(where);
    if (!item) return null;
    return this.repo.remove(item);
  }

  async clearCart(userId: number) {
    return this.repo.delete({ user: { id: userId } });
  }

  @Cron('0 3 * * 0')
  async handleCartCleanup() {
    console.log('CRON работает');
    await this.repo
      .createQueryBuilder()
      .delete()
      .where('userId IS NULL')
      .execute();
    console.log('[CRON] Очищены гостевые cartItems без userId');
  }
}
