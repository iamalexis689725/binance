import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateBilleteraDto {
    @IsNumber()
    @IsOptional()
    usuario_id: number;

    @IsNumber()
    @IsOptional()
    moneda_id: number;

    @IsNumber()
    @IsOptional()
    saldo: number;

    @IsString()
    @IsOptional()
    codigo: string;
}
