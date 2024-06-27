import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { User } from "./users/dto/User";
import { MonedasModule } from "./monedas/monedas.module";
import { Moneda } from "./monedas/entities/moneda.entity";
import { BilleterasModule } from "./billeteras/billeteras.module";
import { Billetera } from "./billeteras/entities/billetera.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "",
            database: "binance",
            entities: [User, Moneda, Billetera],
            synchronize: true, //esto es solo para desarrollo
        }),
        TypeOrmModule.forFeature([User]),
        AuthModule,
        UsersModule,
        MonedasModule,
        BilleterasModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
