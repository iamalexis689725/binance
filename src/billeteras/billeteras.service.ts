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

    findAll() {
        return this.billeteraRepository.find({ relations: ["moneda"] });
    }

    findOne(id: number) {
        return this.billeteraRepository.findOne({ relations: ["moneda"], where: { id } });
    }

    async update(id: number, updateBilleteraDto: UpdateBilleteraDto) {
        const billetera = await this.billeteraRepository.findOne({ where: { id }, relations: ["moneda", "usuario"] });

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

        if (updateBilleteraDto.usuario_id) {
            const usuario = await this.usuarioRepository.findOneBy({ id: updateBilleteraDto.usuario_id });
            if (!usuario) {
                throw new NotFoundException("Usuario not found");
            }
            billetera.usuario = usuario;
        }

        billetera.saldo = updateBilleteraDto.saldo ?? billetera.saldo;
        billetera.codigo = updateBilleteraDto.codigo ?? billetera.codigo;

        return this.billeteraRepository.save(billetera);
    }

    async remove(id: number) {
        await this.billeteraRepository.delete(id);
    }
}
