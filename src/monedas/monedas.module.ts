import { Module } from "@nestjs/common";
import { MonedasService } from "./monedas.service";
import { MonedasController } from "./monedas.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Moneda } from "./entities/moneda.entity";
import { Billetera } from "../billeteras/entities/billetera.entity";
import { BilleterasController } from "../billeteras/billeteras.controller";
import { BilleterasService } from "../billeteras/billeteras.service";
import { User } from "../users/dto/User";
import { UsersController } from "../users/users.controller";
import { UsersService } from "../users/users.service";

@Module({
    imports: [TypeOrmModule.forFeature([Moneda, Billetera, User])],
    controllers: [MonedasController, BilleterasController, UsersController],
    providers: [MonedasService, BilleterasService, UsersService],
})
export class MonedasModule {}
