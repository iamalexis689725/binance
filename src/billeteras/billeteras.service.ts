import { Injectable } from "@nestjs/common";
import { CreateBilleteraDto } from "./dto/create-billetera.dto";
import { UpdateBilleteraDto } from "./dto/update-billetera.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Billetera } from "./entities/billetera.entity";
import { Repository } from "typeorm";

@Injectable()
export class BilleterasService {
    constructor(
        @InjectRepository(Billetera)
        private billeteraRepository: Repository<Billetera>,
    ) {}

    create(createBilleteraDto: CreateBilleteraDto) {
        return this.billeteraRepository.save(createBilleteraDto);
    }

    findAll() {
        return this.billeteraRepository.find();
    }

    findOne(id: number) {
        return this.billeteraRepository.findOneBy({ id });
    }

    async update(id: number, updateBilleteraDto: UpdateBilleteraDto) {
        await this.billeteraRepository.update(id, updateBilleteraDto);
        return this.billeteraRepository.findOneBy({ id });
    }

    async remove(id: number) {
        await this.billeteraRepository.delete(id);
    }
}
