import { BusinessOwner } from "src/modules/business-owners/entity/business-owner.entity";
import { Plan } from "src/modules/plans/entity/plan.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, JoinColumn } from "typeorm";

@Entity("core_subscriptions")
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  plan_id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Plan, (plan) => plan.subscriptions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "plan_id" })
  plan: Plan;

  @ManyToOne(() => BusinessOwner, (owner) => owner.subscriptions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "business_owner_id" })
  business_owner: BusinessOwner;
}