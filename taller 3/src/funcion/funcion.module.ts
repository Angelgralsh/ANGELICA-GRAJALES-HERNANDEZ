import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcion } from './funcion.entity';
import { FuncionService } from './funcion.service';
import { FuncionController } from './funcion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Funcion])],
  controllers: [FuncionController],
  providers: [FuncionService],
  exports: [FuncionService],
})
export class FuncionModule {}