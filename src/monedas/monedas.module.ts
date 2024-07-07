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
import { Movimiento } from "../movimientos/entities/movimiento.entity";
import { MovimientosController } from "../movimientos/movimientos.controller";
import { MovimientosService } from "../movimientos/movimientos.service";

@Module({
    imports: [TypeOrmModule.forFeature([Moneda, Billetera, User, Movimiento])],
    controllers: [MonedasController, BilleterasController, UsersController, MovimientosController],
    providers: [MonedasService, BilleterasService, UsersService, MovimientosService],
})
export class MonedasModule {}
