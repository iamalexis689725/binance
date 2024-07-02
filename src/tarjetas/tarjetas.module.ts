import { Module } from "@nestjs/common";
import { TarjetasService } from "./tarjetas.service";
import { TarjetasController } from "./tarjetas.controller";
import { UsersController } from "../users/users.controller";
import { UsersService } from "../users/users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tarjeta } from "./entities/tarjeta.entity";
import { User } from "../users/dto/User";

@Module({
    imports: [TypeOrmModule.forFeature([Tarjeta, User])],
    controllers: [TarjetasController, UsersController],
    providers: [TarjetasService, UsersService],
})
export class TarjetasModule {}
