import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Billetera } from "../../billeteras/entities/billetera.entity";
import { Tarjeta } from "../../tarjetas/entities/tarjeta.entity";

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
}
