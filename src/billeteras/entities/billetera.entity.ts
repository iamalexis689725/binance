import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Moneda } from "../../monedas/entities/moneda.entity";
import { User } from "../../users/dto/User";
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
}
