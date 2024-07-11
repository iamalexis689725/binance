import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Billetera } from "../../billeteras/entities/billetera.entity";
import { Venta } from "../../ventas/entities/venta.entity";

@Entity()
export class Moneda {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column("double")
    valorUSD: number;

    @Column("double")
    valorMoneda: number;

    @OneToMany(() => Billetera, billetera => billetera.moneda)
    billetera?: Billetera[];

    @OneToMany(() => Venta, venta => venta.moneda)
    venta?: Venta[];
}
