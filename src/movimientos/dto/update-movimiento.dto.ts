import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateMovimientoDto {
    @IsNumber()
    @IsOptional()
    billetera_id?: number;

    @IsNumber()
    @IsOptional()
    movReferencia_id?: number;

    @IsNumber()
    @IsOptional()
    monto?: number;

    @IsString()
    @IsOptional()
    tipo?: string;

    @IsDateString()
    @IsOptional()
    fecha?: Date;
}
