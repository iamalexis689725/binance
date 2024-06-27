import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateBilleteraDto {
    @IsNumber()
    @IsOptional()
    usuario: number;

    @IsNumber()
    @IsOptional()
    moneda: number;

    @IsNumber()
    @IsOptional()
    saldo: number;

    @IsString()
    @IsOptional()
    codigo: string;
}
