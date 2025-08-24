import { User } from 'src/user/entities/user.entity'
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, user => user.cartItem, { nullable: true, onDelete: 'SET NULL' })
  user: User

  @Column({ nullable: true, type: 'int', default: 1 })
  quantity: number

  @Column({ nullable: true, type: 'bigint' })
  guestId: string | null

  @Column({ nullable: true, type: 'jsonb' })
  fileNames: string[]

  @Column()
  type: string // например: "Печать визиток"

  @Column({ type: 'jsonb' })
  options: Record<string, any> // все параметры, включая summ, format и т.д.

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
