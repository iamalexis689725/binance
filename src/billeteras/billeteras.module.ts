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
import { Movimiento } from "../movimientos/entities/movimiento.entity";
import { MovimientosController } from "../movimientos/movimientos.controller";
import { MovimientosService } from "../movimientos/movimientos.service";

@Module({
    imports: [TypeOrmModule.forFeature([Billetera, Moneda, User, Movimiento])],
    controllers: [BilleterasController, MonedasController, UsersController, MovimientosController],
    providers: [BilleterasService, MonedasService, UsersService, MovimientosService],
})
export class BilleterasModule {}
