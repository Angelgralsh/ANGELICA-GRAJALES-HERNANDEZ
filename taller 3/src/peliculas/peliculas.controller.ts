import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PeliculasService } from './pelicula.service';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';
import { UpdatePeliculaDto } from './dto/actualizar-pelicula.dto';

@Controller('peliculas')
export class PeliculasController {
  constructor(private readonly peliculasService: PeliculasService) {}

  @Post()
  create(@Body() dto: CreatePeliculaDto) {
    return this.peliculasService.create(dto);
  }

  @Get()
  findAll() {
    return this.peliculasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peliculasService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePeliculaDto) {
    return this.peliculasService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peliculasService.remove(id);
  }

  @Get('genero/:genero')
  findByGenero(@Param('genero') genero: string) {
    return this.peliculasService.findByGenero(genero);
  }

  @Get('activas/listado')
  findActivas() {
    return this.peliculasService.findActivas();
  }
}