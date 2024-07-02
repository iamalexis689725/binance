import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTarjetaDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;
    @IsString()
    @IsNotEmpty()
    numero: string;
    @IsNumber()
    @IsNotEmpty()
    cvv: number;
    @IsDateString()
    @IsNotEmpty()
    fechaVencimiento: Date;
    @IsNumber()
    usuario_id: number;
}
