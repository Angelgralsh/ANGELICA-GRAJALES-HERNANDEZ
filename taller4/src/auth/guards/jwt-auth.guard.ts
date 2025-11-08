/**
 * ============================================================
 * 🛡️ JWT Authentication Guard
 * ============================================================
 *
 * Este guard se encarga de proteger las rutas que requieren autenticación
 * mediante un **token JWT (JSON Web Token)**.
 *
 * Antes de permitir el acceso a un endpoint, el guard:
 * 1️⃣ Verifica si el endpoint fue marcado como público (decorador `@Public()`).
 * 2️⃣ Si no es público, valida automáticamente el token enviado en los headers:
 *     - `Authorization: Bearer <token>`
 * 3️⃣ Si el token es válido, NestJS inyecta la información del usuario autenticado
 *     en `request.user`, disponible dentro del controlador.
 *
 * ---
 *
 * 📘 Ejemplo de uso:
 * ```ts
 * import { Controller, Get, UseGuards } from '@nestjs/common';
 * import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
 *
 * @Controller('perfil')
 * @UseGuards(JwtAuthGuard)
 * export class PerfilController {
 *   @Get()
 *   obtenerPerfil(@Request() req) {
 *     return req.user; // Datos del usuario autenticado
 *   }
 * }
 * ```
 *
 * ---
 *
 * ⚙️ Ejemplo de encabezado HTTP:
 * ```
 * Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 * ```
 *
 * Si el token es inválido o está ausente → Nest lanzará un error `401 Unauthorized`.
 * Si el token es válido → el flujo continúa normalmente hacia el controlador.
 */

import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    /**
     * Determina si la solicitud puede continuar hacia el controlador.
     *
     * - Si el endpoint fue marcado como público (decorador `@Public()`),
     *   el guard permite el acceso sin verificar token.
     * - Si no, se ejecuta la verificación JWT estándar del `AuthGuard('jwt')`.
     *
     * @param context Contexto de ejecución actual.
     * @returns `true` si la ruta es pública o si el token JWT es válido.
     * @throws 401 Unauthorized si el token no es válido o no se envía.
     */
    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
        context.getHandler(),
        context.getClass(),
        ]);

        if (isPublic) {
        // ✅ Endpoint marcado como público: no requiere autenticación
        return true;
        }

        // 🔒 Requiere autenticación: aplica la validación JWT
        return super.canActivate(context);
    }
}
