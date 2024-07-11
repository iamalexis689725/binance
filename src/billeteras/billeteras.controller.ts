import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put, NotFoundException } from "@nestjs/common";
import { BilleterasService } from "./billeteras.service";
import { CreateBilleteraDto } from "./dto/create-billetera.dto";
import { UpdateBilleteraDto } from "./dto/update-billetera.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller("billeteras")
export class BilleterasController {
    constructor(private readonly billeterasService: BilleterasService) {}

    @Post()
    create(@Body() createBilleteraDto: CreateBilleteraDto) {
        return this.billeterasService.create(createBilleteraDto);
    }

    @Get()
    findAll() {
        return this.billeterasService.findAll();
    }

    @Get("mine")
    @UseGuards(AuthGuard)
    findMine(@Request() req) {
        const userId = req.user.sub; // Obtener el ID del usuario del token JWT
        return this.billeterasService.findByUserId(userId);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.billeterasService.findOne(+id);
    }

    @Get("usuario/:id")
    findByUserId(@Param("id") id: number) {
        return this.billeterasService.findByUserId(id).catch(() => {
            throw new NotFoundException(`billetera con usuario '${id}' no encontrado.`);
        });
    }

    @Get("codigo-unico/:codigoUnico")
    findByCodigoUnico(@Param("codigoUnico") codigoUnico: string) {
        return this.billeterasService.findByCodigoUnico(codigoUnico).catch(() => {
            throw new NotFoundException(`Beneficiario con código único '${codigoUnico}' no encontrado.`);
        });
    }

    @Put(":id")
    updatePut(@Param("id") id: string, @Body() updateBilleteraDto: CreateBilleteraDto) {
        return this.billeterasService.update(+id, updateBilleteraDto);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateBilleteraDto: UpdateBilleteraDto) {
        return this.billeterasService.update(+id, updateBilleteraDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.billeterasService.remove(+id);
    }
}
