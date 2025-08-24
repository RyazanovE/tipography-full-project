import { CartItem } from 'src/cart/entities/cart_item.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.order, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  user: User | null;

  @Column({ nullable: true, type: 'jsonb' })
  info: {
    clientInfo: {
      fio: string;
      phone: string;
      email: string;
    };
    deliveryInfo: {
      deliveryMethod: 1 | 2;
      address: {
        city: string;
        street: string;
        house: string;
        room: string;
        comment: string;
      } | null;
      tkInfo: { address: string } | null;
    };
  };

  @Column({ type: 'jsonb' })
  items: CartItem[]; 

  @Column()
  status: 'pending' | 'processing' | 'completed' | 'cancelled';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ unique: true, nullable: true })
  orderNumber: string;

  @BeforeInsert()
  generateOrderNumber() {
    this.orderNumber = `ORD-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Math.floor(10000 + Math.random() * 90000)}`;
  }
}
