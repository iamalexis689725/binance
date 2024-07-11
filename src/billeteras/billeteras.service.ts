import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateBilleteraDto } from "./dto/create-billetera.dto";
import { UpdateBilleteraDto } from "./dto/update-billetera.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Billetera } from "./entities/billetera.entity";
import { Repository } from "typeorm";
import { Moneda } from "../monedas/entities/moneda.entity";
import { User } from "../users/dto/User";

@Injectable()
export class BilleterasService {
    constructor(
        @InjectRepository(Billetera)
        private billeteraRepository: Repository<Billetera>,

        @InjectRepository(Moneda)
        private readonly monedaRepository: Repository<Moneda>,

        @InjectRepository(User)
        private readonly usuarioRepository: Repository<User>,
    ) {}

    async create(createBilleteraDto: CreateBilleteraDto) {
        const moneda = await this.monedaRepository.findOneBy({ id: createBilleteraDto.moneda_id });
        if (!moneda) {
            throw new NotFoundException("Moneda not found");
        }
        const usuario = await this.usuarioRepository.findOneBy({ id: createBilleteraDto.usuario_id });
        if (!usuario) {
            throw new NotFoundException("Usuario not found");
        }
        const billetera = this.billeteraRepository.create({
            ...createBilleteraDto,
            usuario,
            moneda,
        });
        return this.billeteraRepository.save(billetera);
    }

    async findAll() {
        const billeteras = await this.billeteraRepository.find({ relations: ["moneda"] });
        return billeteras.map(billetera => ({
            ...billetera,
            valorEnUSD: billetera.saldo * billetera.moneda.valorUSD,
        }));
    }

    async findOne(id: number) {
        const billetera = await this.billeteraRepository.findOne({ relations: ["moneda"], where: { id } });
        if (!billetera) {
            throw new NotFoundException("Billetera not found");
        }
        return {
            ...billetera,
            valorEnUSD: billetera.saldo * billetera.moneda.valorUSD,
        };
    }

    /*Esto lo ocupo para el poder buscar las billeteras por el usuario logueado*/
    async findByUserId(userId: number) {
        const billeteras = await this.billeteraRepository.find({ where: { usuario: { id: userId } }, relations: ["moneda"] });
        return billeteras.map(billetera => ({
            ...billetera,
            valorEnUSD: billetera.saldo * billetera.moneda.valorUSD,
        }));
    }

    async findByCodigoUnico(codigo: string) {
        const billetera = await this.billeteraRepository.findOne({ relations: ["usuario", "moneda"], where: { codigo } });
        if (!billetera) {
            throw new NotFoundException("Billetera not found");
        }
        return billetera;
    }

    async update(id: number, updateBilleteraDto: UpdateBilleteraDto) {
        const billetera = await this.billeteraRepository.findOne({ where: { id }, relations: ["moneda"] });

        if (!billetera) {
            throw new NotFoundException("Billetera not found");
        }

        if (updateBilleteraDto.moneda_id) {
            const moneda = await this.monedaRepository.findOneBy({ id: updateBilleteraDto.moneda_id });
            if (!moneda) {
                throw new NotFoundException("Moneda not found");
            }
            billetera.moneda = moneda;
        }

        billetera.saldo = updateBilleteraDto.saldo ?? billetera.saldo;
        billetera.codigo = updateBilleteraDto.codigo ?? billetera.codigo;

        return this.billeteraRepository.save(billetera);
    }

    async remove(id: number) {
        await this.billeteraRepository.delete(id);
    }
}
