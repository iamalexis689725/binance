import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBilleteraDto {
    @IsNumber()
    usuario_id: number;

    @IsNumber()
    moneda_id: number;

    @IsNumber()
    @IsNotEmpty()
    saldo: number;

    @IsString()
    @IsNotEmpty()
    codigo: string;
}
