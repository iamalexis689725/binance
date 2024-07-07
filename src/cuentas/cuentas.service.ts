import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCuentaDto } from "./dto/create-cuenta.dto";
import { UpdateCuentaDto } from "./dto/update-cuenta.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Cuenta } from "./entities/cuenta.entity";
import { Repository } from "typeorm";
import { User } from "../users/dto/User";

@Injectable()
export class CuentasService {
    constructor(
        @InjectRepository(Cuenta)
        private cuentaRepository: Repository<Cuenta>,

        @InjectRepository(User)
        private readonly usuarioRepository: Repository<User>,
    ) {}

    async create(createCuentaDto: CreateCuentaDto) {
        const usuario = await this.usuarioRepository.findOneBy({ id: createCuentaDto.usuario_id });
        if (!usuario) {
            throw new NotFoundException("Usuario not found");
        }
        const cuenta = this.cuentaRepository.create({
            ...createCuentaDto,
            usuario,
        });
        return this.cuentaRepository.save(cuenta);
    }

    async findAll() {
        const cuentas = await this.cuentaRepository.find({ relations: ["usuario"] });
        return cuentas.map(cuenta => ({
            ...cuenta,
        }));
    }

    findOne(id: number) {
        return this.cuentaRepository.findOneBy({ id });
    }

    async update(id: number, updateCuentaDto: UpdateCuentaDto) {
        const cuenta = await this.cuentaRepository.findOne({ where: { id }, relations: ["usuario"] });

        if (!cuenta) {
            throw new NotFoundException("Cuenta not found");
        }

        if (updateCuentaDto.usuario_id) {
            const usuario = await this.usuarioRepository.findOneBy({ id: updateCuentaDto.usuario_id });
            if (!usuario) {
                throw new NotFoundException("usuario not found");
            }
            cuenta.usuario = usuario;
        }

        cuenta.numeroCuenta = updateCuentaDto.numeroCuenta ?? cuenta.numeroCuenta;
        cuenta.nombre = updateCuentaDto.nombre ?? cuenta.nombre;
        cuenta.documentoIdentidad = updateCuentaDto.documentoIdentidad ?? cuenta.documentoIdentidad;
        cuenta.banco = updateCuentaDto.banco ?? cuenta.banco;
        cuenta.moneda = updateCuentaDto.moneda ?? cuenta.moneda;

        return this.cuentaRepository.save(cuenta);
    }

    /*Esto lo ocupo para el poder buscar las cuentas por el usuario logueado*/
    async findByUserId(userId: number): Promise<Cuenta[]> {
        const cuentas = await this.cuentaRepository.find({
            where: { usuario: { id: userId } },
            relations: ["usuario"],
        });
        return cuentas;
    }

    async remove(id: number) {
        await this.cuentaRepository.delete(id);
    }
}
