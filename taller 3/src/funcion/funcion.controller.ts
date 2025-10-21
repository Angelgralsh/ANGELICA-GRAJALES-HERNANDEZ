import { 
  Controller, Get, Post, Put, Delete, Param, Body, Query, HttpException, HttpStatus 
} from '@nestjs/common';
import { FuncionService } from './funcion.service';
import { CreateFuncionDto } from './dto/crear-funcion.dto';
import { UpdateFuncionDto } from './dto/actualizar-funcion.dto';

@Controller('funciones')
export class FuncionController {
  constructor(private readonly funcionService: FuncionService) {}

  @Get()
  async findAll() {
    try {
      const funciones = await this.funcionService.findAll();
      return {
        success: true,
        data: funciones,
        count: funciones.length,
      };
    } catch (error) {
      throw new HttpException('Error al obtener las funciones', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const funcion = await this.funcionService.findOne(id);
      return { success: true, data: funcion };
    } catch (error) {
      throw new HttpException('Función no encontrada', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async create(@Body() funcionData: CreateFuncionDto) {
    try {
      const nuevaFuncion = await this.funcionService.create(funcionData);
      return {
        success: true,
        message: 'Función creada exitosamente',
        data: nuevaFuncion,
      };
    } catch (error) {
      throw new HttpException('Error al crear la función', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() funcionData: UpdateFuncionDto) {
    try {
      const funcionActualizada = await this.funcionService.update(id, funcionData);
      return {
        success: true,
        message: 'Función actualizada exitosamente',
        data: funcionActualizada,
      };
    } catch (error) {
      throw new HttpException('Error al actualizar la función', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.funcionService.remove(id);
      return { success: true, message: 'Función eliminada exitosamente' };
    } catch (error) {
      throw new HttpException('Error al eliminar la función', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('pelicula/:peliculaId')
  async findByPelicula(@Param('peliculaId') peliculaId: string) {
    const funciones = await this.funcionService.findByPelicula(peliculaId);
    return { success: true, data: funciones, count: funciones.length };
  }

  @Get('proximas')
  async findProximas() {
    const funciones = await this.funcionService.findProximas();
    return { success: true, data: funciones, count: funciones.length };
  }

  @Get('fecha')
  async obtenerPorFecha(@Query('fecha') fecha: string) {
    if (!fecha) {
      throw new HttpException('La fecha es requerida', HttpStatus.BAD_REQUEST);
    }
    const funciones = await this.funcionService.obtenerFuncionesPorFecha(new Date(fecha));
    return { success: true, data: funciones, count: funciones.length };
  }
}