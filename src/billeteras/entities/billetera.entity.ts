import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Moneda } from "../../monedas/entities/moneda.entity";
@Entity()
export class Billetera {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    usuario: number;

    @ManyToOne(() => Moneda, moneda => moneda.billetera, { onDelete: "CASCADE" })
    moneda: Moneda;

    @Column("double")
    saldo: number;

    @Column()
    codigo: string;
}
