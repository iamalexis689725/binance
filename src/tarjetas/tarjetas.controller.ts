import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Request } from "@nestjs/common";
import { TarjetasService } from "./tarjetas.service";
import { CreateTarjetaDto } from "./dto/create-tarjeta.dto";
import { UpdateTarjetaDto } from "./dto/update-tarjeta.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller("tarjetas")
export class TarjetasController {
    constructor(private readonly tarjetasService: TarjetasService) {}

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createTarjetaDto: CreateTarjetaDto) {
        return this.tarjetasService.create(createTarjetaDto);
    }

    @Get()
    findAll() {
        return this.tarjetasService.findAll();
    }

    @Get("mine")
    @UseGuards(AuthGuard)
    findMine(@Request() req) {
        const userId = req.user.sub; // Obtener el ID del usuario del token JWT
        return this.tarjetasService.findByUserId(userId);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.tarjetasService.findOne(+id);
    }

    @Put(":id")
    updatePut(@Param("id") id: string, @Body() updateTarjetaDto: CreateTarjetaDto) {
        return this.tarjetasService.update(+id, updateTarjetaDto);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateTarjetaDto: UpdateTarjetaDto) {
        return this.tarjetasService.update(+id, updateTarjetaDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.tarjetasService.remove(+id);
    }
}
