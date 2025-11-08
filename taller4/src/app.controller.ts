/**
 * Controlador principal de la aplicación.
 * 
 * Gestiona las rutas base (raíz) del sistema y sirve como punto
 * de prueba para verificar que la API esté en funcionamiento.
 * 
 * Este endpoint es útil para comprobar la disponibilidad del servidor
 * y validar que la conexión con el backend esté activa.
 */

import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('General')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Endpoint principal de prueba.
   * 
   * Permite verificar que el servidor está funcionando correctamente.
   * 
   * @returns Un mensaje simple con el estado de la API.
   */
  @Get()
  @ApiOperation({
    summary: 'Verificar estado del servidor',
    description:
      'Este endpoint devuelve un mensaje de confirmación para comprobar que la API está activa y operativa.',
  })
  @ApiResponse({
    status: 200,
    description: 'El servidor está funcionando correctamente.',
    schema: {
      example: {
        message: 'API funcionando correctamente',
        status: 'ok',
        timestamp: '2025-10-30T04:22:11.123Z',
      },
    },
  })
  getHello() {
    return {
      message: this.appService.getHello(),
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
