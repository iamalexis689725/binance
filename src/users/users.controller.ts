import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDto } from "./dto/UserDto";
import { UserUpdateDto } from "./dto/UserUpdateDto";
import { AuthGuard } from "../auth/auth.guard";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() userDto: UserDto) {
        return this.usersService.create(userDto);
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.usersService.findOne(+id);
    }

    @Put(":id")
    updatePut(@Param("id") id: string, @Body() updateUserDto: UserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateUserDto: UserUpdateDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.usersService.remove(+id);
    }
}
