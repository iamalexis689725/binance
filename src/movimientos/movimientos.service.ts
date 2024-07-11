import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMovimientoDto } from "./dto/create-movimiento.dto";
import { UpdateMovimientoDto } from "./dto/update-movimiento.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Movimiento } from "./entities/movimiento.entity";
import { Repository } from "typeorm";
import { Billetera } from "../billeteras/entities/billetera.entity";

@Injectable()
export class MovimientosService {
    constructor(
        @InjectRepository(Movimiento)
        private movimientoRepository: Repository<Movimiento>,

        @InjectRepository(Billetera)
        private billeteraRepository: Repository<Billetera>,
    ) {}

    async create(createMovimientoDto: CreateMovimientoDto) {
        const billetera = await this.billeteraRepository.findOneBy({ id: createMovimientoDto.billetera_id });
        if (!billetera) {
            throw new NotFoundException("Billetera not found");
        }

        let movReferencia: Movimiento | null = null;
        if (createMovimientoDto.movReferencia_id) {
            movReferencia = await this.movimientoRepository.findOneBy({ id: createMovimientoDto.movReferencia_id });
            if (!movReferencia) {
                throw new NotFoundException("Referencia de movimiento not found");
            }
        }

        const movimiento = this.movimientoRepository.create({
            ...createMovimientoDto,
            billetera,
            movReferencia,
        });
        return this.movimientoRepository.save(movimiento);
    }

    async findAll() {
        const movimientos = await this.movimientoRepository.find({ relations: ["billetera", "movReferencia"] });
        return movimientos;
    }

    async findOne(id: number) {
        const movimiento = await this.movimientoRepository.findOne({ relations: ["billetera", "movReferencia"], where: { id } });
        if (!movimiento) {
            throw new NotFoundException("Movimiento not found");
        }
        return movimiento;
    }

    async findByBilleteraId(billeteraId: number) {
        const movimientos = await this.movimientoRepository.find({
            relations: ["billetera", "movReferencia"],
            where: { billetera: { id: billeteraId } },
        });

        if (!movimientos || movimientos.length === 0) {
            throw new NotFoundException("No movements found for this billetera ID");
        }

        return movimientos;
    }

    async update(id: number, updateMovimientoDto: UpdateMovimientoDto) {
        const movimiento = await this.movimientoRepository.findOne({ where: { id }, relations: ["billetera", "movReferencia"] });

        if (!movimiento) {
            throw new NotFoundException("Movimiento not found");
        }

        if (updateMovimientoDto.billetera_id) {
            const billetera = await this.billeteraRepository.findOneBy({ id: updateMovimientoDto.billetera_id });
            if (!billetera) {
                throw new NotFoundException("Billetera not found");
            }
            movimiento.billetera = billetera;
        }

        if (updateMovimientoDto.movReferencia_id) {
            const movReferencia = await this.movimientoRepository.findOneBy({ id: updateMovimientoDto.movReferencia_id });
            if (!movReferencia) {
                throw new NotFoundException("Referencia de movimiento not found");
            }
            movimiento.movReferencia = movReferencia;
        }

        movimiento.monto = updateMovimientoDto.monto ?? movimiento.monto;
        movimiento.tipo = updateMovimientoDto.tipo ?? movimiento.tipo;
        movimiento.fecha = updateMovimientoDto.fecha ?? movimiento.fecha;

        return this.movimientoRepository.save(movimiento);
    }

    async remove(id: number) {
        await this.movimientoRepository.delete(id);
    }
}
