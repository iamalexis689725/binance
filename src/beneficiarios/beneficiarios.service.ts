import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateBeneficiarioDto } from "./dto/create-beneficiario.dto";
import { UpdateBeneficiarioDto } from "./dto/update-beneficiario.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Beneficiario } from "./entities/beneficiario.entity";
import { Repository } from "typeorm";
import { User } from "../users/dto/User";

@Injectable()
export class BeneficiariosService {
    constructor(
        @InjectRepository(Beneficiario)
        private beneficiarioRepository: Repository<Beneficiario>,
        @InjectRepository(User)
        private readonly usuarioRepository: Repository<User>,
    ) {}

    async create(createBeneficiarioDto: CreateBeneficiarioDto) {
        const usuario = await this.usuarioRepository.findOneBy({ id: createBeneficiarioDto.usuario_id });
        if (!usuario) {
            throw new NotFoundException("Usuario not found");
        }
        const beneficiario = this.beneficiarioRepository.create({
            ...createBeneficiarioDto,
            usuario,
        });
        return this.beneficiarioRepository.save(beneficiario);
    }

    async findAll() {
        const beneficiario = await this.beneficiarioRepository.find({ relations: ["usuario"] });
        return beneficiario.map(beneficiario => ({
            ...beneficiario,
        }));
    }

    async findOne(id: number) {
        return this.beneficiarioRepository.findOneBy({ id });
    }

    async update(id: number, updateBeneficiarioDto: UpdateBeneficiarioDto) {
        const beneficiario = await this.beneficiarioRepository.findOne({ where: { id }, relations: ["usuario"] });

        if (!beneficiario) {
            throw new NotFoundException("Billetera not found");
        }

        if (updateBeneficiarioDto.usuario_id) {
            const usuario = await this.usuarioRepository.findOneBy({ id: updateBeneficiarioDto.usuario_id });
            if (!usuario) {
                throw new NotFoundException("Moneda not found");
            }
            beneficiario.usuario = usuario;
        }

        beneficiario.nombreReferencia = updateBeneficiarioDto.nombreReferencia ?? beneficiario.nombreReferencia;
        beneficiario.codigoUnico = updateBeneficiarioDto.codigoUnico ?? beneficiario.codigoUnico;

        return this.beneficiarioRepository.save(beneficiario);
    }

    async remove(id: number) {
        await this.beneficiarioRepository.delete(id);
    }

    /*Esto lo ocupo para el poder buscar los beneficiarios por el usuario logueado*/
    async findByUserId(userId: number) {
        const beneficiario = await this.beneficiarioRepository.find({ where: { usuario: { id: userId } }, relations: ["usuario"] });
        return beneficiario.map(beneficiario => ({
            ...beneficiario,
        }));
    }
}
