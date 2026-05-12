import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "src/modules/users/entity/users.entity";
import { Outlet } from "src/modules/outlets/entity/outlets.entity";
import { BusinessOwner } from "../../business-owners/entity/business-owner.entity";

@Entity("core_tenants")
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ type: "uuid", generated: "uuid" })
  uuid: string;

  @Index({ unique: true })
  @Column({ nullable: true })
  slug: string;

  @Column()
  name: string;

  // 🏢 Business Info
  @Column({ nullable: true })
  legal_name: string;

  @Column({ nullable: true })
  business_type: string;

  @Column({ nullable: true })
  tax_id: string;

  @Column({ nullable: true })
  registration_number: string;

  // 🌍 Location & Currency
  @Column({ default: "India" })
  country: string;

  @Column({ default: "IN" })
  country_code: string;

  @Column({ default: "INR" })
  currency: string;

  @Column({ nullable: true })
  timezone: string;

  // 📞 Contact Info
  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  contact_name: string;

  @Column({ nullable: true })
  website: string;

  // 📍 Address
  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  postal_code: string;

  // 🏷 Branding
  @Column({ nullable: true })
  logo_url: string;

  // 📊 Status
  @Column({ default: "Active" })
  status: "Active" | "Terminated" | "Suspended" | "Trial";

  @Column({ default: false })
  onboarding_complete: boolean;

  // 💳 Subscription
  @Column({ nullable: true })
  plan: string;

  @Column({ nullable: true })
  billing_cycle: "Monthly" | "Yearly";

  // // ⚙️ Flexible fields
  // @Column({ type: "jsonb", nullable: true })
  // settings: Record<string, any>;

  // 🗑 Soft delete
  @Column({ default: false })
  is_deleted: boolean;

  // 🕒 Audit
  @CreateDateColumn()
  created_on: Date;

  @UpdateDateColumn()
  updated_on: Date;

  // 🔥 RELATIONS
  @Column({ nullable: true })
  business_owner_id: number;

  @ManyToOne(() => BusinessOwner, (businessOwner) => businessOwner.tenants, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'business_owner_id' })
  business_owner: BusinessOwner;

  @OneToMany(() => Outlet, (outlet) => outlet.tenant)
  outlets: Outlet[];

  @OneToMany(() => User, (user) => user.tenant)
  users: User[];
}