import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from "typeorm";
import { Subscription } from "../../licences/entity/licence.entity";
import { Tenant } from "../../tenants/entity/tenants.entity";
import { BusinessOwnerContact } from "./companyOwnerContact.entity";

@Entity("core_business_owners")
export class BusinessOwner {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ type: "uuid", generated: "uuid" })
  uuid: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ default: "Active" })
  status: "Active" | "Inactive" | "Suspended";

  @OneToMany(() => Subscription, (s) => s.business_owner, {
    cascade: true,
  })
  subscriptions: Subscription[];

  @OneToMany(() => Tenant, (t) => t.business_owner)
  tenants: Tenant[];

  // ================================
  // MULTI-OWNER CONTACTS
  // ================================
  @OneToMany(() => BusinessOwnerContact, (c) => c.business_owner, {
    cascade: true,
  })
  owners: BusinessOwnerContact[];

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_on: Date;

  @UpdateDateColumn()
  updated_on: Date;
}