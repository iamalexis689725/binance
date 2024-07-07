import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMovimientoDto {
    @IsNumber()
    billetera_id: number;

    @IsNumber()
    @IsOptional()
    movReferencia_id?: number;

    @IsNumber()
    @IsNotEmpty()
    monto: number;

    @IsString()
    @IsNotEmpty()
    tipo: string;

    @IsDateString()
    @IsNotEmpty()
    fecha: Date;
}
