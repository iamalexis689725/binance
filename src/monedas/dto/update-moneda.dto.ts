import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateMonedaDto {
    @IsString()
    @IsOptional()
    readonly nombre: string;
    @IsNumber()
    @IsOptional()
    readonly valorUSD: number;
}
