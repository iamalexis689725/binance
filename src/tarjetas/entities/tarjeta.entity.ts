import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/dto/User";

@Entity()
export class Tarjeta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    numero: string;

    @Column()
    cvv: number;

    @Column()
    fechaVencimiento: Date;

    @ManyToOne(() => User, usuario => usuario.tarjeta, { onDelete: "CASCADE" })
    usuario: User;
}
