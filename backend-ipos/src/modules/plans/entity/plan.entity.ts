import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Subscription } from '../../subscriptions/entity/subscription.entity';

@Entity('core_plans')
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true, nullable: true })
  code: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ default: 'Monthly' })
  billing_cycle: 'Monthly' | 'Yearly';

  // ================================
  // RESOURCE LIMITS
  // ================================

  @Column({ type: 'int', nullable: true })
  max_tenants: number;

  @Column({ type: 'int', nullable: true })
  max_outlets: number;

  @Column({ type: 'int', nullable: true })
  max_users: number;

  @Column({ type: 'int', nullable: true })
  max_devices: number;

  // ================================
  // ENTERPRISE FLAG
  // ================================

  @Column({ default: false })
  is_custom: boolean;

  @Column({ default: true })
  is_active: boolean;

  // ================================
  // AUDIT
  // ================================

  @CreateDateColumn()
  created_on: Date;

  @UpdateDateColumn()
  updated_on: Date;

  // ================================
  // RELATIONS
  // ================================

  @OneToMany(() => Subscription, (subscription) => subscription.plan)
  subscriptions: Subscription[];
}
