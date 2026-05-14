

import { BusinessOwner } from "src/modules/companies/entity/companyOwner.entity";
import { Plan } from "src/modules/plans/entity/plan.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";



@Entity('core_subscriptions')
export class Subscription {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ type: 'int', nullable: true })
  custom_max_tenants: number;

  @Column({ type: 'int', nullable: true })
  custom_max_outlets: number;

  @Column({ type: 'int', nullable: true })
  custom_max_users: number;

  @Column({ type: 'int', nullable: true })
  custom_max_devices: number;

  @Column({ default: 'active' })
  status: 'active' | 'trial' | 'expired' | 'cancelled';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  start_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_date: Date;

  @Column({ default: true })
  auto_renew: boolean;

  // ✅ RELATIONS ONLY
  @ManyToOne(() => Plan, (plan) => plan.subscriptions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "plan_id" })
  plan: Plan;

  @ManyToOne(() => BusinessOwner, (owner) => owner.subscriptions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "business_owner_id" })
  business_owner: BusinessOwner;
}