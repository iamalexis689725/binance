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
import { Movimiento } from "../movimientos/entities/movimiento.entity";
import { MovimientosService } from "../movimientos/movimientos.service";
import { MovimientosController } from "../movimientos/movimientos.controller";
import { Cuenta } from "../cuentas/entities/cuenta.entity";
import { CuentasService } from "../cuentas/cuentas.service";
import { CuentasController } from "../cuentas/cuentas.controller";
import { Beneficiario } from "../beneficiarios/entities/beneficiario.entity";
import { BeneficiariosService } from "../beneficiarios/beneficiarios.service";
import { BeneficiariosController } from "../beneficiarios/beneficiarios.controller";

@Module({
    imports: [TypeOrmModule.forFeature([User, Billetera, Moneda, Tarjeta, Movimiento, Cuenta, Beneficiario])],
    providers: [UsersService, BilleterasService, MonedasService, TarjetasService, MovimientosService, CuentasService, BeneficiariosService],
    exports: [UsersService],
    controllers: [UsersController, BilleterasController, MonedasController, TarjetasController, MovimientosController, CuentasController, BeneficiariosController],
})
export class UsersModule {}
