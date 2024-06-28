import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Billetera } from "../../billeteras/entities/billetera.entity";

@Entity()
export class Moneda {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column("double")
    valorUSD: number;

    @OneToMany(() => Billetera, billetera => billetera.moneda)
    billetera?: Billetera[];
}
