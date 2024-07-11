import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateVentaDto {
    @IsNumber()
    moneda_id: number;

    @IsNumber()
    @IsNotEmpty()
    valor: number;

    @IsNumber()
    @IsNotEmpty()
    monto: number;

    @IsNumber()
    billeteraOrigen_id: number;

    @IsNumber()
    @IsOptional()
    billeteraDestino_id: number;

    @IsString()
    @IsNotEmpty()
    metodoDePago: string;

    @IsNumber()
    @IsNotEmpty()
    estado: number;

    @IsNumber()
    usuario_id: number;
}
