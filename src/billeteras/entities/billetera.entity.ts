import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Moneda } from "../../monedas/entities/moneda.entity";
import { User } from "../../users/dto/User";
import { Movimiento } from "../../movimientos/entities/movimiento.entity";
import { Venta } from "../../ventas/entities/venta.entity";
@Entity()
export class Billetera {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, usuario => usuario.billetera, { onDelete: "CASCADE" })
    usuario: User;

    @ManyToOne(() => Moneda, moneda => moneda.billetera, { onDelete: "CASCADE" })
    moneda: Moneda;

    @Column("double")
    saldo: number;

    @Column()
    codigo: string;

    @OneToMany(() => Movimiento, movimiento => movimiento.billetera)
    movimiento?: Movimiento[];

    @OneToMany(() => Venta, venta => venta.billeteraOrigen)
    ventasOrigen?: Venta[];

    @OneToMany(() => Venta, venta => venta.billeteraDestino)
    ventasDestino?: Venta[];
}
