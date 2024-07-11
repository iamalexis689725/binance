import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, AfterLoad } from "typeorm";
import { Moneda } from "../../monedas/entities/moneda.entity";
import { Billetera } from "../../billeteras/entities/billetera.entity";
import { User } from "../../users/dto/User";

@Entity()
export class Venta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    valor: number;

    @Column()
    monto: number;

    @Column()
    metodoDePago: string;

    @Column()
    estado: number;

    comprobanteURL: string;

    @ManyToOne(() => Moneda)
    @JoinColumn()
    moneda: Moneda;

    @ManyToOne(() => Billetera)
    @JoinColumn()
    billeteraOrigen: Billetera;

    @ManyToOne(() => Billetera, { nullable: true })
    @JoinColumn()
    billeteraDestino: Billetera;

    @ManyToOne(() => User)
    @JoinColumn()
    usuario: User;

    @AfterLoad()
    setComprobanteURL() {
        this.comprobanteURL = `http://localhost:3000/uploads/${this.id}.png`;
    }
}
