/**
 * ============================================================
 * 🧩 RolesGuard — Validación de Roles de Usuario
 * ============================================================
 *
 * Este guard se encarga de **verificar que el usuario autenticado**
 * tenga alguno de los roles permitidos para acceder a un endpoint específico.
 *
 * Se utiliza junto con:
 *  - `@UseGuards(JwtAuthGuard, RolesGuard)` → activa autenticación + validación de rol.
 *  - `@Roles('admin', 'empleado')` → define los roles permitidos.
 *
 * ---
 *
 * ⚙️ Flujo de funcionamiento:
 * 1️⃣ Extrae los roles requeridos del decorador `@Roles()` usando el `Reflector`.
 * 2️⃣ Obtiene el usuario autenticado del objeto `Request` (`request.user`).
 * 3️⃣ Verifica si el usuario tiene un rol incluido en la lista permitida.
 * 4️⃣ Si no cumple, lanza una excepción `403 Forbidden`.
 *
 * ---
 *
 * 📘 Ejemplo de uso:
 * ```ts
 * import { Controller, Get, UseGuards } from '@nestjs/common';
 * import { Roles } from '../auth/decorators/roles.decorator';
 * import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
 * import { RolesGuard } from '../auth/guards/roles.guard';
 *
 * @Controller('admin')
 * @UseGuards(JwtAuthGuard, RolesGuard)
 * export class AdminController {
 *   @Get('panel')
 *   @Roles('admin')
 *   accederPanelAdmin() {
 *     return { message: 'Bienvenido al panel de administración' };
 *   }
 * }
 * ```
 *
 * ---
 *
 * 🔐 Ejemplo de token decodificado (`request.user`):
 * ```json
 * {
 *   "sub": 1,
 *   "nombre": "Carlos Gómez",
 *   "rol": "empleado",
 *   "iat": 1730165400,
 *   "exp": 1730172600
 * }
 * ```
 *
 * ---
 *
 * ❌ Posibles errores:
 * - `403 Forbidden`: El usuario no tiene el rol requerido.
 * - `401 Unauthorized`: El token JWT es inválido o no fue enviado.
 */

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    /**
     * Determina si el usuario autenticado puede acceder a la ruta solicitada.
     *
     * - Si el endpoint no tiene roles definidos, el acceso se permite libremente.
     * - Si tiene roles definidos, se valida que el usuario tenga al menos uno.
     *
     * @param context Contexto de ejecución actual (contiene la request y el handler).
     * @returns `true` si el usuario tiene un rol autorizado.
     * @throws `ForbiddenException` si el usuario no posee los permisos necesarios.
     */
    canActivate(context: ExecutionContext): boolean {
        // Extrae los roles permitidos definidos con @Roles()
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!roles) return true; // Si no hay roles definidos, se permite el acceso libre

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user || !user.rol) {
        throw new ForbiddenException('No se pudo validar el rol del usuario.');
        }

        // Verifica si el rol del usuario está dentro de los permitidos
        const hasRole = roles.includes(user.rol);

        if (!hasRole) {
        throw new ForbiddenException(
            `Acceso denegado: se requiere uno de los siguientes roles: ${roles.join(', ')}.`,
        );
        }

        return true;
    }
}
