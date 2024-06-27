import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from "@nestjs/common";
import { BilleterasService } from "./billeteras.service";
import { CreateBilleteraDto } from "./dto/create-billetera.dto";
import { UpdateBilleteraDto } from "./dto/update-billetera.dto";

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

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.billeterasService.findOne(+id);
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
