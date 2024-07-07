import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/dto/User";

@Entity()
export class Cuenta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    numeroCuenta: string;

    @Column()
    nombre: string;

    @Column()
    documentoIdentidad: string;

    @Column()
    banco: string;

    @Column()
    moneda: string;

    @ManyToOne(() => User, usuario => usuario.cuenta, { onDelete: "CASCADE" })
    usuario: User;
}
