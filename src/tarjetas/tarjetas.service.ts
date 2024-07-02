import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTarjetaDto } from "./dto/create-tarjeta.dto";
import { UpdateTarjetaDto } from "./dto/update-tarjeta.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Tarjeta } from "./entities/tarjeta.entity";
import { Repository } from "typeorm";
import { User } from "../users/dto/User";

@Injectable()
export class TarjetasService {
    constructor(
        @InjectRepository(Tarjeta)
        private tarjetaRepository: Repository<Tarjeta>,

        @InjectRepository(User)
        private readonly usuarioRepository: Repository<User>,
    ) {}

    async create(createTarjetaDto: CreateTarjetaDto) {
        const usuario = await this.usuarioRepository.findOneBy({ id: createTarjetaDto.usuario_id });
        if (!usuario) {
            throw new NotFoundException("Usuario not found");
        }
        const tarjeta = this.tarjetaRepository.create({
            ...createTarjetaDto,
            usuario,
        });
        return this.tarjetaRepository.save(tarjeta);
    }

    async findAll() {
        const tarjetas = await this.tarjetaRepository.find({ relations: ["usuario"] });
        return tarjetas.map(tarjeta => ({
            ...tarjeta,
        }));
    }

    findOne(id: number) {
        return this.tarjetaRepository.findOneBy({ id });
    }

    async update(id: number, updateTarjetaDto: UpdateTarjetaDto) {
        const tarjeta = await this.tarjetaRepository.findOne({ where: { id }, relations: ["usuario"] });

        if (!tarjeta) {
            throw new NotFoundException("Tarjeta not found");
        }

        if (updateTarjetaDto.usuario_id) {
            const usuario = await this.usuarioRepository.findOneBy({ id: updateTarjetaDto.usuario_id });
            if (!usuario) {
                throw new NotFoundException("usuario not found");
            }
            tarjeta.usuario = usuario;
        }

        tarjeta.nombre = updateTarjetaDto.nombre ?? tarjeta.nombre;
        tarjeta.numero = updateTarjetaDto.numero ?? tarjeta.numero;
        tarjeta.cvv = updateTarjetaDto.cvv ?? tarjeta.cvv;
        tarjeta.fechaVencimiento = updateTarjetaDto.fechaVencimiento ?? tarjeta.fechaVencimiento;

        return this.tarjetaRepository.save(tarjeta);
    }

    /*Esto lo ocupo para el poder buscar las tarjetas por el usuario logueado*/
    async findByUserId(userId: number): Promise<Tarjeta[]> {
        const tarjetas = await this.tarjetaRepository.find({
            where: { usuario: { id: userId } },
            relations: ["usuario"],
        });
        return tarjetas;
    }

    async remove(id: number) {
        await this.tarjetaRepository.delete(id);
    }
}
