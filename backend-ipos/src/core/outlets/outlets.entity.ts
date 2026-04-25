import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Tenant } from "../tenants/tenants.entity";
import { UserRole } from "../../auth/user-roles/user-roles.entity";
import { User } from "../../auth/users/users.entity";

@Entity('core_outlets')
export class Outlet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true, generated: 'uuid' })
  uuid: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.outlets)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column()
  tenant_id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  type: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  address_line1: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  postal_code: string;

  @Column({ nullable: true })
  timezone: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'jsonb', nullable: true })
  operating_hours: any;

  @Column({ nullable: true })
  tax_rule: string;

  @Column({ nullable: true })
  currency: string;

  @Column({ nullable: true })
  receipt_header: string;

  @Column({ nullable: true })
  receipt_footer: string;

  @Column({ default: 1 })
  number_of_registers: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'manager_id' })
  manager: User;

  @Column({ nullable: true })
  manager_id: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_on: Date;

  @UpdateDateColumn()
  updated_on: Date;

  // 🔥 RELATION
  @OneToMany(() => UserRole, (ur) => ur.outlet)
  userRoles: UserRole[];
}