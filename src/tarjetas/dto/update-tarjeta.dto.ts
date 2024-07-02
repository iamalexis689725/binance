import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateTarjetaDto {
    @IsString()
    @IsOptional()
    readonly nombre: string;
    @IsString()
    @IsOptional()
    readonly numero: string;
    @IsNumber()
    @IsOptional()
    readonly cvv: number;
    @IsDateString()
    @IsOptional()
    readonly fechaVencimiento: Date;
    @IsNumber()
    @IsOptional()
    readonly usuario_id: number;
}
