import { Module } from "@nestjs/common";
import { BilleterasService } from "./billeteras.service";
import { BilleterasController } from "./billeteras.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Billetera } from "./entities/billetera.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Billetera])],
    controllers: [BilleterasController],
    providers: [BilleterasService],
})
export class BilleterasModule {}
