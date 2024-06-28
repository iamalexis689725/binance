import { Module } from "@nestjs/common";
import { MonedasService } from "./monedas.service";
import { MonedasController } from "./monedas.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Moneda } from "./entities/moneda.entity";
import { Billetera } from "../billeteras/entities/billetera.entity";
import { BilleterasController } from "../billeteras/billeteras.controller";
import { BilleterasService } from "../billeteras/billeteras.service";

@Module({
    imports: [TypeOrmModule.forFeature([Moneda, Billetera])],
    controllers: [MonedasController, BilleterasController],
    providers: [MonedasService, BilleterasService],
})
export class MonedasModule {}
