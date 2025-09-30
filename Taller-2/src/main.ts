/**
 * Archivo principal de la aplicación NestJS
 * Punto de entrada que configura e inicializa el servidor
 */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Función bootstrap que inicializa la aplicación
 * Configura los pipes globales y arranca el servidor
 */
async function bootstrap() {
  // Crear la instancia de la aplicación NestJS usando el módulo raíz
  const app = await NestFactory.create(AppModule);
  
  // Configurar pipe de validación global para todos los endpoints
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Solo permite propiedades definidas en los DTOs
    transform: true, // Transforma automáticamente los datos según los tipos definidos
    transformOptions: { enableImplicitConversion: true }, // Convierte tipos automáticamente (string a number, etc.)
  }));
  
  // Iniciar el servidor en el puerto 3000
  await app.listen(3000);
  console.log(' Servidor ejecutándose en http://localhost:3000');
}

// Ejecutar la función bootstrap
bootstrap();
