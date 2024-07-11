import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException } from "@nestjs/common";
import { MovimientosService } from "./movimientos.service";
import { CreateMovimientoDto } from "./dto/create-movimiento.dto";
import { UpdateMovimientoDto } from "./dto/update-movimiento.dto";

@Controller("movimientos")
export class MovimientosController {
    constructor(private readonly movimientosService: MovimientosService) {}

    @Post()
    create(@Body() createMovimientoDto: CreateMovimientoDto) {
        return this.movimientosService.create(createMovimientoDto);
    }

    @Get()
    findAll() {
        return this.movimientosService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.movimientosService.findOne(+id);
    }

    @Get("billetera/:billeteraId")
    findByBilleteraId(@Param("billeteraId") billeteraId: string) {
        return this.movimientosService.findByBilleteraId(+billeteraId).catch(() => {
            throw new NotFoundException(`Movimientos with billetera ID '${billeteraId}' not found.`);
        });
    }

    @Put(":id")
    updatePut(@Param("id") id: string, @Body() updateMovimientoDto: CreateMovimientoDto) {
        return this.movimientosService.update(+id, updateMovimientoDto);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateMovimientoDto: UpdateMovimientoDto) {
        return this.movimientosService.update(+id, updateMovimientoDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.movimientosService.remove(+id);
    }
}
