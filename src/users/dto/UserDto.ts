import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class UserDto {
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;
    @IsString()
    @IsNotEmpty()
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    readonly password: string;
    @IsBoolean()
    @IsNotEmpty()
    readonly esAdmin: boolean;
}
