/**
 * Punto de entrada principal de la aplicación NestJS.
 *
 * Crea la instancia de la aplicación, configura los pipes globales
 * de validación y lanza el servidor en el puerto definido.
 */

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  // Crear la aplicación
  const app = await NestFactory.create(AppModule);

  /**
   * Configuración global de validación de DTOs.
   *
   * - `whitelist`: elimina propiedades no declaradas en los DTOs.
   * - `forbidNonWhitelisted`: lanza error si se envían campos no válidos.
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  /**
   * Configuración de Swagger para documentación y pruebas interactivas.
   *
   * - `addBearerAuth()`: habilita autenticación con token JWT en Swagger.
   * - `SwaggerModule.setup()`: define la ruta del panel Swagger.
   */
  const config = new DocumentBuilder()
    .setTitle('API del Sistema de Gestión')
    .setDescription('Documentación completa de los módulos del sistema (Auth, Administrador, Cliente, etc.)')
    .setVersion('1.0')
    .addBearerAuth() // Activa botón “Authorize” para JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Escucha el puerto definido en .env o usa 3000 por defecto
  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log(`Swagger disponible en http://localhost:${port}/api`);
}

bootstrap();
