import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cors from "cors";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Configurar CORS
    app.use(
        cors({
            origin: "http://localhost:5173", // Origen permitido
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Métodos permitidos
            credentials: true, // Si deseas permitir credenciales (cookies, cabeceras de autorización, etc.)
        }),
    );

    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
bootstrap();
