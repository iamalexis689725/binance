import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCuentaDto {
    @IsString()
    @IsNotEmpty()
    numeroCuenta: string;
    @IsString()
    @IsNotEmpty()
    nombre: string;
    @IsString()
    @IsNotEmpty()
    documentoIdentidad: string;
    @IsString()
    @IsNotEmpty()
    banco: string;
    @IsString()
    @IsNotEmpty()
    moneda: string;
    @IsNumber()
    usuario_id: number;
}
