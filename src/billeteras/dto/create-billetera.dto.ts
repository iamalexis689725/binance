import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBilleteraDto {
    @IsNumber()
    @IsNotEmpty()
    usuario: number;

    @IsNumber()
    @IsNotEmpty()
    moneda: number;

    @IsNumber()
    @IsNotEmpty()
    saldo: number;

    @IsString()
    @IsNotEmpty()
    codigo: string;
}
