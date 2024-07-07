import { Module } from "@nestjs/common";
import { MovimientosService } from "./movimientos.service";
import { MovimientosController } from "./movimientos.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Movimiento } from "./entities/movimiento.entity";
import { Billetera } from "../billeteras/entities/billetera.entity";
import { BilleterasController } from "../billeteras/billeteras.controller";
import { BilleterasService } from "../billeteras/billeteras.service";
import { Moneda } from "../monedas/entities/moneda.entity";
import { MonedasController } from "../monedas/monedas.controller";
import { MonedasService } from "../monedas/monedas.service";
import { User } from "../users/dto/User";
import { UsersController } from "../users/users.controller";
import { UsersService } from "../users/users.service";

@Module({
    imports: [TypeOrmModule.forFeature([Movimiento, Billetera, Moneda, User])],
    controllers: [MovimientosController, BilleterasController, MonedasController, UsersController],
    providers: [MovimientosService, BilleterasService, MonedasService, UsersService],
})
export class MovimientosModule {}
