import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBeneficiarioDto {
    @IsString()
    @IsNotEmpty()
    nombreReferencia: string;
    @IsString()
    @IsNotEmpty()
    codigoUnico: string;
    @IsNumber()
    usuario_id: number;
}
