import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from "@nestjs/common";
import { MonedasService } from "./monedas.service";
import { CreateMonedaDto } from "./dto/create-moneda.dto";
import { UpdateMonedaDto } from "./dto/update-moneda.dto";

@Controller("monedas")
export class MonedasController {
    constructor(private readonly monedasService: MonedasService) {}

    @Post()
    create(@Body() createMonedaDto: CreateMonedaDto) {
        return this.monedasService.create(createMonedaDto);
    }

    @Get()
    findAll() {
        return this.monedasService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.monedasService.findOne(+id);
    }

    @Put(":id")
    updatePut(@Param("id") id: string, @Body() updateMonedaDto: CreateMonedaDto) {
        return this.monedasService.update(+id, updateMonedaDto);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateMonedaDto: UpdateMonedaDto) {
        return this.monedasService.update(+id, updateMonedaDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.monedasService.remove(+id);
    }
}
