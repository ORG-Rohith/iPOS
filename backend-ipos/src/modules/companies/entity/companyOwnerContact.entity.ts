import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import { BusinessOwner } from "./companyOwner.entity";

@Entity("core_business_owner_contacts")
export class BusinessOwnerContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ type: "uuid", generated: "uuid" })
  uuid: string;

  // ================================
  // CONTACT INFO
  // ================================

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ default: "Owner" })
  role: string;

  @Column({ default: false })
  is_primary: boolean;

  // ================================
  // RELATION
  // ================================

  @ManyToOne(() => BusinessOwner, (owner) => owner.owners, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "business_owner_id" })
  business_owner: BusinessOwner;

  // ================================
  // AUDIT
  // ================================

  @CreateDateColumn()
  created_on: Date;

  @UpdateDateColumn()
  updated_on: Date;
}
