import { Module } from "@nestjs/common";
import { VentasService } from "./ventas.service";
import { VentasController } from "./ventas.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Venta } from "./entities/venta.entity";
import { Billetera } from "../billeteras/entities/billetera.entity";
import { Moneda } from "../monedas/entities/moneda.entity";
import { User } from "../users/dto/User";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Module({
    imports: [
        MulterModule.register({
            storage: diskStorage({
                destination: "./uploads", // Directorio donde se guardarán los archivos
                filename: (req, file, callback) => {
                    const idSuffix = req.params.id;
                    const extension = file.originalname.split(".").pop();
                    const filename = `${idSuffix}.${extension}`;
                    callback(null, filename);
                },
            }),
        }),
        TypeOrmModule.forFeature([Venta, Billetera, Moneda, User]),
    ],
    controllers: [VentasController],
    providers: [VentasService],
})
export class VentasModule {}
