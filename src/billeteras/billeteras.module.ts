import { Module } from "@nestjs/common";
import { BilleterasService } from "./billeteras.service";
import { BilleterasController } from "./billeteras.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Billetera } from "./entities/billetera.entity";
import { Moneda } from "../monedas/entities/moneda.entity";
import { MonedasController } from "../monedas/monedas.controller";
import { MonedasService } from "../monedas/monedas.service";
import { User } from "../users/dto/User";
import { UsersController } from "../users/users.controller";
import { UsersService } from "../users/users.service";

@Module({
    imports: [TypeOrmModule.forFeature([Billetera, Moneda, User])],
    controllers: [BilleterasController, MonedasController, UsersController],
    providers: [BilleterasService, MonedasService, UsersService],
})
export class BilleterasModule {}
