import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UserUpdateDto {
    @IsString()
    @IsOptional()
    readonly nombre: string;
    @IsString()
    @IsOptional()
    readonly email: string;
    @IsString()
    @IsOptional()
    readonly password: string;
    @IsBoolean()
    @IsOptional()
    readonly esAdmin: boolean;
}
