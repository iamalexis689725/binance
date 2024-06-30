import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./dto/User";
import { UsersController } from "./users.controller";
import { Billetera } from "../billeteras/entities/billetera.entity";
import { BilleterasService } from "../billeteras/billeteras.service";
import { BilleterasController } from "../billeteras/billeteras.controller";
import { Moneda } from "../monedas/entities/moneda.entity";
import { MonedasService } from "../monedas/monedas.service";
import { MonedasController } from "../monedas/monedas.controller";

@Module({
    imports: [TypeOrmModule.forFeature([User, Billetera, Moneda])],
    providers: [UsersService, BilleterasService, MonedasService],
    exports: [UsersService],
    controllers: [UsersController, BilleterasController, MonedasController],
})
export class UsersModule {}
