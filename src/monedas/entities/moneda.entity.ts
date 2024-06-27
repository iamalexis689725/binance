import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Moneda {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column("double")
    valorUSD: number;
}
