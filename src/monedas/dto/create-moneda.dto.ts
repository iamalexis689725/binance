import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMonedaDto {
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;
    @IsNumber()
    @IsNotEmpty()
    readonly valorUSD: number;
}
