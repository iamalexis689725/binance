import { Module } from "@nestjs/common";
import { CuentasService } from "./cuentas.service";
import { CuentasController } from "./cuentas.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cuenta } from "./entities/cuenta.entity";
import { User } from "../users/dto/User";
import { UsersController } from "../users/users.controller";
import { UsersService } from "../users/users.service";

@Module({
    imports: [TypeOrmModule.forFeature([Cuenta, User])],
    controllers: [CuentasController, UsersController],
    providers: [CuentasService, UsersService],
})
export class CuentasModule {}
