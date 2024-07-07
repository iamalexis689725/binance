import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Request } from "@nestjs/common";
import { CuentasService } from "./cuentas.service";
import { CreateCuentaDto } from "./dto/create-cuenta.dto";
import { UpdateCuentaDto } from "./dto/update-cuenta.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller("cuentas")
export class CuentasController {
    constructor(private readonly cuentasService: CuentasService) {}

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createCuentaDto: CreateCuentaDto) {
        return this.cuentasService.create(createCuentaDto);
    }

    @Get()
    findAll() {
        return this.cuentasService.findAll();
    }

    @Get("mine")
    @UseGuards(AuthGuard)
    findMine(@Request() req) {
        const userId = req.user.sub; // Obtener el ID del usuario del token JWT
        return this.cuentasService.findByUserId(userId);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.cuentasService.findOne(+id);
    }

    @Put(":id")
    updatePut(@Param("id") id: string, @Body() updateCuentaDto: CreateCuentaDto) {
        return this.cuentasService.update(+id, updateCuentaDto);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateCuentaDto: UpdateCuentaDto) {
        return this.cuentasService.update(+id, updateCuentaDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.cuentasService.remove(+id);
    }
}
