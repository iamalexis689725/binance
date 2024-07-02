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
import { Tarjeta } from "../tarjetas/entities/tarjeta.entity";
import { TarjetasService } from "../tarjetas/tarjetas.service";
import { TarjetasController } from "../tarjetas/tarjetas.controller";

@Module({
    imports: [TypeOrmModule.forFeature([User, Billetera, Moneda, Tarjeta])],
    providers: [UsersService, BilleterasService, MonedasService, TarjetasService],
    exports: [UsersService],
    controllers: [UsersController, BilleterasController, MonedasController, TarjetasController],
})
export class UsersModule {}
