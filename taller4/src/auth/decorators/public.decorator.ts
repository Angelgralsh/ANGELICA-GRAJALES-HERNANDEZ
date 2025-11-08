/**
 * ============================================================
 * 🪶 Decorador @Public() — Endpoints sin autenticación
 * ============================================================
 *
 * Este decorador marca un endpoint o controlador como **público**, 
 * es decir, que **no requiere token JWT** para ser accedido.
 *
 * ---
 *
 * ⚙️ Funcionamiento:
 * - Agrega la metadata `isPublic: true` al handler (o clase).
 * - El `JwtAuthGuard` revisa esta metadata antes de validar el token.
 * - Si detecta `isPublic: true`, **omite la verificación JWT**.
 *
 * ---
 *
 * 📘 Ejemplo de uso:
 * ```ts
 * import { Controller, Get } from '@nestjs/common';
 * import { Public } from '../auth/decorators/public.decorator';
 *
 * @Controller('informacion')
 * export class InformacionController {
 *   @Public()
 *   @Get('version')
 *   obtenerVersion() {
 *     return { version: '1.0.0', estado: 'API pública' };
 *   }
 * }
 * ```
 *
 * ---
 *
 * 🧠 Contexto:
 * Este decorador trabaja junto con el `JwtAuthGuard`:
 * ```ts
 * @UseGuards(JwtAuthGuard)
 * ```
 * Dentro del guard, se utiliza:
 * ```ts
 * const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
 *   context.getHandler(),
 *   context.getClass(),
 * ]);
 * ```
 * Si `isPublic` es `true`, el guard permite el acceso sin verificar el token JWT.
 *
 * ---
 *
 * ✅ Buenas prácticas:
 * - Utilízalo solo en rutas que deben ser públicas realmente (por ejemplo: login, register, documentación).
 * - Evita aplicarlo en controladores completos salvo que todo el módulo sea público.
 * - Asegúrate de usarlo **antes** del guard para que NestJS lo reconozca correctamente.
 *
 * ---
 *
 * 🚀 Resultado:
 * Permite construir endpoints públicos de forma segura y declarativa,
 * sin necesidad de eliminar los guards globales.
 */

import { SetMetadata } from '@nestjs/common';

/**
 * Decorador `@Public()` que marca un endpoint o controlador como accesible sin autenticación JWT.
 */
export const Public = () => SetMetadata('isPublic', true);
