import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Billetera {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    usuario: number;

    @Column()
    moneda: number;

    @Column("double")
    saldo: number;

    @Column()
    codigo: string;
}
