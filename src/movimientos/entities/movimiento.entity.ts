import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Billetera } from "../../billeteras/entities/billetera.entity";

@Entity()
export class Movimiento {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Billetera, billetera => billetera.movimiento, {
        onDelete: "CASCADE",
    })
    billetera: Billetera;

    @ManyToOne(() => Movimiento, movimiento => movimiento.movimientos, { onDelete: "CASCADE" })
    movReferencia: Movimiento;

    @OneToMany(() => Movimiento, movimiento => movimiento.movReferencia)
    movimientos: Movimiento[];

    @Column("double")
    monto: number;

    @Column()
    tipo: string;

    @Column()
    fecha: Date;
}
