/**
 * Servicio principal de la aplicación.
 * 
 * Proporciona la lógica asociada al controlador raíz.
 * Sirve de ejemplo para pruebas unitarias y configuración base.
 */

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Retorna un mensaje de saludo genérico.
   * 
   * @returns Texto "Holiii 😎!".
   */
  getHello(): string {
    return 'Holiii 😎!';
  }
}
