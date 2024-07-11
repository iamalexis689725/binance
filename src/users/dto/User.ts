import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Billetera } from "../../billeteras/entities/billetera.entity";
import { Tarjeta } from "../../tarjetas/entities/tarjeta.entity";
import { Cuenta } from "../../cuentas/entities/cuenta.entity";
import { Beneficiario } from "../../beneficiarios/entities/beneficiario.entity";
import { Venta } from "../../ventas/entities/venta.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    esAdmin: boolean;

    @OneToMany(() => Billetera, billetera => billetera.usuario)
    billetera?: Billetera[];

    @OneToMany(() => Tarjeta, tarjeta => tarjeta.usuario)
    tarjeta?: Tarjeta[];

    @OneToMany(() => Cuenta, cuenta => cuenta.usuario)
    cuenta?: Cuenta[];

    @OneToMany(() => Beneficiario, beneficiario => beneficiario.usuario)
    beneficiario?: Beneficiario[];

    @OneToMany(() => Venta, venta => venta.usuario)
    venta?: Venta[];
}
