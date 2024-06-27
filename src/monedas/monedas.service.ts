import { Injectable } from "@nestjs/common";
import { CreateMonedaDto } from "./dto/create-moneda.dto";
import { UpdateMonedaDto } from "./dto/update-moneda.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Moneda } from "./entities/moneda.entity";
import { Repository } from "typeorm";

@Injectable()
export class MonedasService {
    constructor(
        @InjectRepository(Moneda)
        private monedaRepository: Repository<Moneda>,
    ) {}

    create(createMonedaDto: CreateMonedaDto) {
        return this.monedaRepository.save(createMonedaDto);
    }

    findAll() {
        return this.monedaRepository.find();
    }

    findOne(id: number) {
        return this.monedaRepository.findOneBy({ id });
    }

    async update(id: number, updateMonedaDto: UpdateMonedaDto) {
        await this.monedaRepository.update(id, updateMonedaDto);
        return this.monedaRepository.findOneBy({ id });
    }

    async remove(id: number) {
        await this.monedaRepository.delete(id);
    }
}
