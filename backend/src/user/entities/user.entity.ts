import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/auth/enums/role.enum';
import { CartItem } from 'src/cart/entities/cart_item.entity';
import { Order } from 'src/orders/entities/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true, type: 'jsonb' })
  address: {
    city: string;
    street: string;
    house: string;
    room: string;
    comment: string;
  } | null;

  @Column({ nullable: true })
  name: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.GUEST,
  })
  role: Role;

  @Column({ nullable: true })
  hashedRefreshToken?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar', nullable: true })
  confirmToken?: string | null;

  @Column({ type: 'varchar', nullable: true })
  passwordResetToken?: string | null;

  @Column({ type: 'timestamp', nullable: true })
  confirmTokenExpires: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  passwordResetTokenExpires: Date | null;

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword() {
    if (this.password && !this.password.startsWith('$2b$')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  @OneToMany(() => CartItem, (cart) => cart.user)
  cartItem: CartItem[];

  @OneToMany(() => Order, (order) => order.user)
  order: Order[];
}
