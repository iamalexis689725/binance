import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Request } from "@nestjs/common";
import { BeneficiariosService } from "./beneficiarios.service";
import { CreateBeneficiarioDto } from "./dto/create-beneficiario.dto";
import { UpdateBeneficiarioDto } from "./dto/update-beneficiario.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller("beneficiarios")
export class BeneficiariosController {
    constructor(private readonly beneficiariosService: BeneficiariosService) {}

    @Post()
    create(@Body() createBeneficiarioDto: CreateBeneficiarioDto) {
        return this.beneficiariosService.create(createBeneficiarioDto);
    }

    @Get()
    findAll() {
        return this.beneficiariosService.findAll();
    }

    @Get("mine")
    @UseGuards(AuthGuard)
    findMine(@Request() req) {
        const userId = req.user.sub; // Obtener el ID del usuario del token JWT
        return this.beneficiariosService.findByUserId(userId);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.beneficiariosService.findOne(+id);
    }

    @Put(":id")
    updatePut(@Param("id") id: string, @Body() updateBeneficiarioDto: CreateBeneficiarioDto) {
        return this.beneficiariosService.update(+id, updateBeneficiarioDto);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateBeneficiarioDto: UpdateBeneficiarioDto) {
        return this.beneficiariosService.update(+id, updateBeneficiarioDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.beneficiariosService.remove(+id);
    }
}
