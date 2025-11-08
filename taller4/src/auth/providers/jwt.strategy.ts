/**
 * ============================================================
 * 🔐 Estrategia JWT para Passport
 * ============================================================
 *
 * Esta estrategia define cómo se debe extraer, verificar y validar
 * el token JWT incluido en las solicitudes HTTP protegidas.
 *
 * 📦 Funcionalidades:
 * - Extrae el token desde la cabecera `Authorization: Bearer <token>`.
 * - Valida la firma usando la clave secreta definida en `.env`.
 * - Inyecta en `request.user` los datos básicos del usuario autenticado.
 *
 * 💡 Uso común:
 * ```ts
 * @UseGuards(JwtAuthGuard)
 * ```
 */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        const secret = configService.get<string>('JWT_SECRET');

        if (!secret) {
            throw new Error('❌ Error: JWT_SECRET no está definido en el archivo .env');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // Rechaza tokens expirados
            secretOrKey: secret,
        });
    }

    /**
     * Valida y decodifica el token JWT.
     * 
     * Este método se ejecuta automáticamente después de verificar la firma del token.
     * Devuelve el payload que se inyectará en `request.user`.
     * 
     * @param payload - Datos decodificados del token JWT.
     * @returns Objeto con la información del usuario autenticado.
     * 
     * ---
     * 📤 Ejemplo del objeto resultante:
     * ```json
     * {
     *   "id": 1,
     *   "correo": "usuario@ejemplo.com",
     *   "rol": "admin"
     * }
     * ```
     */
    async validate(payload: any) {
        return {
            id: payload.id,
            correo: payload.correo,
            rol: payload.rol,
        };
    }
}
