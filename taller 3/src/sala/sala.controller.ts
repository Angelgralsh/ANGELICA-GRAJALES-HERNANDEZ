import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { SalaService } from './sala.service';
import { Sala } from './sala.entity';

@Controller('salas')
export class SalaController {
  constructor(private readonly salaService: SalaService) {}

  @Get()
  findAll(): Promise<Sala[]> {
    return this.salaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Sala> {
    return this.salaService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Sala>): Promise<Sala> {
    return this.salaService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Sala>): Promise<Sala> {
    return this.salaService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.salaService.remove(id);
  }
}