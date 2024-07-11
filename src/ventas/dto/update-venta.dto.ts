import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateVentaDto {
    @IsNumber()
    @IsOptional()
    moneda_id: number;

    @IsNumber()
    @IsOptional()
    valor: number;

    @IsNumber()
    @IsOptional()
    monto: number;

    @IsNumber()
    @IsOptional()
    billeteraOrigen_id: number;

    @IsNumber()
    @IsOptional()
    billeteraDestino_id: number;

    @IsString()
    @IsOptional()
    metodoDePago: string;

    @IsNumber()
    @IsOptional()
    estado: number;

    @IsNumber()
    @IsOptional()
    usuario_id: number;
}
