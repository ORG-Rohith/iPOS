import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Outlet } from "../outlets/outlets.entity";
import { User } from "src/auth/users/users.entity";

@Entity('core_tenants')
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  uuid: string;

  @Column()
  name: string;

  @Column({ nullable: true, unique: true })
  slug: string;

  @Column()
  country: string;

  @Column()
  currency: string;

  @Column({ nullable: true })
  timezone: string;

  @Column({ nullable: true })
  business_type: string;

  @Column({ nullable: true })
  tax_id: string;

  @Column({ nullable: true })
  logo_url: string;

  @Column({ default: 'active' })
  status: string;

  @Column({ default: false })
  onboarding_complete: boolean;

  @Column({ type: 'jsonb', nullable: true })
  settings: any;

  @CreateDateColumn()
  created_on: Date;

  @UpdateDateColumn()
  updated_on: Date;

  // 🔥 RELATION
  @OneToMany(() => Outlet, (outlet) => outlet.tenant)
  outlets: Outlet[];

  @OneToMany(() => User, (user) => user.tenant)
  users: User[];
}