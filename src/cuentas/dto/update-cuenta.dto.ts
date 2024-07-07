import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCuentaDto {
    @IsString()
    @IsOptional()
    readonly numeroCuenta: string;
    @IsString()
    @IsOptional()
    readonly nombre: string;
    @IsString()
    @IsOptional()
    readonly documentoIdentidad: string;
    @IsString()
    @IsOptional()
    readonly banco: string;
    @IsString()
    @IsOptional()
    readonly moneda: string;
    @IsNumber()
    @IsOptional()
    readonly usuario_id: number;
}
