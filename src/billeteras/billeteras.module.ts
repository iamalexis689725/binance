import { Module } from "@nestjs/common";
import { BilleterasService } from "./billeteras.service";
import { BilleterasController } from "./billeteras.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Billetera } from "./entities/billetera.entity";
import { Moneda } from "../monedas/entities/moneda.entity";
import { MonedasController } from "../monedas/monedas.controller";
import { MonedasService } from "../monedas/monedas.service";

@Module({
    imports: [TypeOrmModule.forFeature([Billetera, Moneda])],
    controllers: [BilleterasController, MonedasController],
    providers: [BilleterasService, MonedasService],
})
export class BilleterasModule {}
