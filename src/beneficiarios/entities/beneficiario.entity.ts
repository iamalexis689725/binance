import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/dto/User";

@Entity()
export class Beneficiario {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombreReferencia: string;
    @Column()
    codigoUnico: string;
    @ManyToOne(() => User, usuario => usuario.beneficiario, { onDelete: "CASCADE" })
    usuario: User;
}
