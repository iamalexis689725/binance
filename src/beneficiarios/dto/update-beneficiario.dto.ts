import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateBeneficiarioDto {
    @IsString()
    @IsOptional()
    nombreReferencia: string;
    @IsString()
    @IsOptional()
    codigoUnico: string;
    @IsNumber()
    @IsOptional()
    usuario_id: number;
}
