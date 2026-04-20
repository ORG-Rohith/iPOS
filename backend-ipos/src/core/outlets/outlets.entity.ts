import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Tenant } from "../tenants/tenants.entity";
import { UserRole } from "../../auth/user-roles/user-roles.entity"; // ✅ add this

@Entity('core_outlets')
export class Outlet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  uuid: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.outlets)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column()
  tenant_id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  country: string;

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