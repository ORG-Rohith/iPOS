import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: "devices",
})
export class Device {
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'uuid', unique: true, generated: 'uuid' })
    uuid: string;

    @Expose()
    @Column()
    device_id: string;

    @Expose()
    @Column()
    outlet_id: string;

    @Column({ nullable: false })
    activation_code: number;

    @Expose()
    @Column()
    tenant_id: number;

    @CreateDateColumn()
    created_on: Date;

    @UpdateDateColumn()
    updated_on: Date;


    @Expose()
    @Column({ nullable: true })
    os: string;

    @Expose()
    @Column({ nullable: true })
    device_type: string;

    @Expose()
    @Column({ default: false })
    device_pair: boolean;

    @Expose()
    @Column({ default: true })
    is_active: boolean;
}