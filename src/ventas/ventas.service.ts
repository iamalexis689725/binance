import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateVentaDto } from "./dto/create-venta.dto";
import { UpdateVentaDto } from "./dto/update-venta.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Venta } from "./entities/venta.entity";
import { Repository, Not } from "typeorm";
import { Moneda } from "../monedas/entities/moneda.entity";
import { Billetera } from "../billeteras/entities/billetera.entity";
import { User } from "../users/dto/User";

@Injectable()
export class VentasService {
    constructor(
        @InjectRepository(Venta)
        private ventaRepository: Repository<Venta>,

        @InjectRepository(Moneda)
        private monedaRepository: Repository<Moneda>,

        @InjectRepository(Billetera)
        private billeteraRepository: Repository<Billetera>,

        @InjectRepository(User)
        private usuarioRepository: Repository<User>,
    ) {}

    async create(createVentaDto: CreateVentaDto) {
        const moneda = await this.monedaRepository.findOne({ where: { id: createVentaDto.moneda_id } });
        if (!moneda) {
            throw new NotFoundException("Moneda not found");
        }
        const usuario = await this.usuarioRepository.findOne({ where: { id: createVentaDto.usuario_id } });
        if (!usuario) {
            throw new NotFoundException("usuario not found");
        }
        const billeteraOrigen = await this.billeteraRepository.findOne({ where: { id: createVentaDto.billeteraOrigen_id } });
        if (!billeteraOrigen) {
            throw new NotFoundException("Billetera Origen not found");
        }

        const billeteraDestino = createVentaDto.billeteraDestino_id ? await this.billeteraRepository.findOne({ where: { id: createVentaDto.billeteraDestino_id } }) : null;

        const venta = this.ventaRepository.create({
            valor: createVentaDto.valor,
            monto: createVentaDto.monto,
            metodoDePago: createVentaDto.metodoDePago,
            estado: createVentaDto.estado,
            moneda: moneda,
            billeteraOrigen: billeteraOrigen,
            billeteraDestino: billeteraDestino,
            usuario: usuario,
        });

        return await this.ventaRepository.save(venta);
    }

    async findAll(): Promise<Venta[]> {
        return await this.ventaRepository.find({ relations: ["moneda", "billeteraOrigen", "billeteraDestino", "usuario"] });
    }

    async findOne(id: number): Promise<Venta> {
        const venta = await this.ventaRepository.findOne({ where: { id }, relations: ["moneda", "billeteraOrigen", "billeteraDestino", "usuario"] });
        if (!venta) {
            throw new NotFoundException(`Venta con ID ${id} no encontrada`);
        }
        return venta;
    }

    async findByUserId(userId: number) {
        const ventas = await this.ventaRepository.find({ where: { usuario: { id: userId } }, relations: ["moneda", "billeteraOrigen", "billeteraDestino", "usuario"] });
        return ventas.map(venta => ({
            ...venta,
        }));
    }

    async findByNoUserId(userId: number) {
        const ventas = await this.ventaRepository.find({ where: { usuario: { id: Not(userId) } }, relations: ["moneda", "billeteraOrigen", "billeteraDestino", "usuario"] });
        return ventas.map(venta => ({
            ...venta,
        }));
    }

    async findAllExcept(excludeId: number): Promise<Venta[]> {
        return await this.ventaRepository.find({ where: { id: Not(excludeId) }, relations: ["moneda", "billeteraOrigen", "billeteraDestino", "usuario"] });
    }

    async update(id: number, updateVentaDto: UpdateVentaDto): Promise<Venta> {
        const existingVenta = await this.ventaRepository.findOne({ where: { id }, relations: ["moneda", "billeteraOrigen", "billeteraDestino"] });
        if (!existingVenta) {
            throw new NotFoundException(`Venta con ID ${id} no encontrada`);
        }

        const moneda = updateVentaDto.moneda_id ? await this.monedaRepository.findOne({ where: { id: updateVentaDto.moneda_id } }) : existingVenta.moneda;
        if (updateVentaDto.moneda_id && !moneda) {
            throw new NotFoundException("Moneda not found");
        }

        const usuario = updateVentaDto.usuario_id ? await this.usuarioRepository.findOne({ where: { id: updateVentaDto.usuario_id } }) : existingVenta.usuario;
        if (updateVentaDto.usuario_id && !usuario) {
            throw new NotFoundException("Usuario not found");
        }

        const billeteraOrigen = updateVentaDto.billeteraOrigen_id
            ? await this.billeteraRepository.findOne({ where: { id: updateVentaDto.billeteraOrigen_id } })
            : existingVenta.billeteraOrigen;
        if (updateVentaDto.billeteraOrigen_id && !billeteraOrigen) {
            throw new NotFoundException("Billetera Origen not found");
        }

        const billeteraDestino = updateVentaDto.billeteraDestino_id
            ? await this.billeteraRepository.findOne({ where: { id: updateVentaDto.billeteraDestino_id } })
            : existingVenta.billeteraDestino;
        if (updateVentaDto.billeteraDestino_id && !billeteraDestino) {
            throw new NotFoundException("Billetera Destino not found");
        }

        const updatedVenta = await this.ventaRepository.preload({
            id: id,
            ...updateVentaDto,
            moneda: moneda,
            usuario: usuario,
            billeteraOrigen: billeteraOrigen,
            billeteraDestino: billeteraDestino,
        });

        if (!updatedVenta) {
            throw new NotFoundException(`Venta con ID ${id} no encontrada al intentar actualizar`);
        }

        return this.ventaRepository.save(updatedVenta);
    }

    async remove(id: number): Promise<void> {
        const result = await this.ventaRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Venta con ID ${id} no encontrada`);
        }
    }
}
