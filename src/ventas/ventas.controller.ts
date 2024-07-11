import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Request, UseInterceptors, UploadedFile, NotFoundException } from "@nestjs/common";
import { VentasService } from "./ventas.service";
import { CreateVentaDto } from "./dto/create-venta.dto";
import { UpdateVentaDto } from "./dto/update-venta.dto";
import { AuthGuard } from "../auth/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { promisify } from "util";
import { unlink } from "fs";
const unlinkAsync = promisify(unlink);

@Controller("ventas")
export class VentasController {
    constructor(private readonly ventasService: VentasService) {}

    @Post()
    create(@Body() createVentaDto: CreateVentaDto) {
        return this.ventasService.create(createVentaDto);
    }

    @Get()
    findAll() {
        return this.ventasService.findAll();
    }

    @Get("mine")
    @UseGuards(AuthGuard)
    findMine(@Request() req) {
        const userId = req.user.sub; // Obtener el ID del usuario del token JWT
        return this.ventasService.findByUserId(userId);
    }

    @Get("nomine")
    @UseGuards(AuthGuard)
    findNoMine(@Request() req) {
        const userId = req.user.sub; // Obtener el ID del usuario del token JWT
        return this.ventasService.findByNoUserId(userId);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.ventasService.findOne(+id);
    }

    @Get(":id/except/:excludeId")
    findAllExcept(@Param("id") id: string, @Param("excludeId") excludeId: string) {
        return this.ventasService.findAllExcept(+excludeId);
    }

    @Put(":id")
    updatePut(@Param("id") id: string, @Body() updateVentaDto: CreateVentaDto) {
        return this.ventasService.update(+id, updateVentaDto);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateVentaDto: UpdateVentaDto) {
        return this.ventasService.update(+id, updateVentaDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.ventasService.remove(+id);
    }

    @Post(":id/profile-picture")
    @UseInterceptors(FileInterceptor("file"))
    async profilePicture(@Param("id") id: number, @UploadedFile() file: Express.Multer.File) {
        console.log(file);
        const objVenta = await this.ventasService.findOne(id);
        if (!objVenta) {
            await unlinkAsync(file.path);
            throw new NotFoundException();
        }
        return {
            originalname: file.originalname,
            filename: file.filename,
            path: file.path,
        };
    }
}
