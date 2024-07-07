import { Module } from "@nestjs/common";
import { BeneficiariosService } from "./beneficiarios.service";
import { BeneficiariosController } from "./beneficiarios.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Beneficiario } from "./entities/beneficiario.entity";
import { User } from "../users/dto/User";
import { UsersController } from "../users/users.controller";
import { UsersService } from "../users/users.service";

@Module({
    imports: [TypeOrmModule.forFeature([Beneficiario, User])],
    controllers: [BeneficiariosController, UsersController],
    providers: [BeneficiariosService, UsersService],
})
export class BeneficiariosModule {}
