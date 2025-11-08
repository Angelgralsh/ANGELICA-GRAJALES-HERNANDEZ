/**
 * Controlador del módulo de Autenticación.
 *
 * Gestiona el registro y la autenticación de los distintos tipos de usuarios:
 * - Clientes
 * - Administradores
 * - Empleados
 *
 * Los endpoints devuelven tokens JWT al iniciar sesión y permiten registrar nuevos clientes.
 * Algunos endpoints requieren autenticación mediante JWT.
 */

import { Controller, Post, Body } from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login-cliente.dto';
import { RegisterDto } from './dtos/register-cliente.dto';
import { LoginAdminDto } from './dtos/login-admin.dto';
import { LoginEmpleadoDto } from './dtos/login-empleado.dto';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // ============================================================
    // 👤 1️⃣ Registro de Cliente
    // ============================================================

    /**
     * Permite registrar un nuevo cliente en el sistema.
     */
    @Post('register/cliente')
    @ApiOperation({
        summary: 'Registrar un nuevo cliente',
        description:
            'Crea un nuevo cliente en el sistema con los datos básicos de registro (nombre, correo, contraseña, etc.).',
    })
    @ApiBody({
        type: RegisterDto,
        examples: {
            exitoso: {
                summary: 'Ejemplo exitoso',
                value: {
                    cli_nombre: 'Carlos Gómez',
                    cli_email: 'carlosgomez@mail.com',
                    cli_contrasena: '123456',
                    cli_telefono: '3001234567',
                },
            },
            error: {
                summary: 'Correo ya registrado',
                value: {
                    cli_nombre: 'Carlos Gómez',
                    cli_email: 'ya_registrado@mail.com',
                    cli_contrasena: '123456',
                    cli_telefono: '3001234567',
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Cliente registrado correctamente.',
        content: {
            'application/json': {
                example: {
                    message: 'Cliente registrado exitosamente.',
                    data: {
                        cli_id: 12,
                        cli_nombre: 'Carlos Gómez',
                        cli_email: 'carlosgomez@mail.com',
                        cli_telefono: '3001234567',
                        createdAt: '2025-10-30T02:45:12.000Z',
                    },
                },
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Datos inválidos o correo ya registrado.',
        content: {
            'application/json': {
                example: {
                    statusCode: 400,
                    message: 'El correo electrónico ya está en uso.',
                    error: 'Bad Request',
                },
            },
        },
    })
    async register(@Body() dto: RegisterDto) {
        return this.authService.registerCliente(dto);
    }

    // ============================================================
    // 🔐 2️⃣ Login de Cliente
    // ============================================================

    /**
     * Permite a un cliente iniciar sesión y obtener un token JWT.
     */
    @Post('login/cliente')
    @ApiOperation({
        summary: 'Inicio de sesión (Cliente)',
        description:
            'Autentica a un cliente mediante correo y contraseña, devolviendo un token JWT y los datos básicos del usuario.',
    })
    @ApiBody({
        type: LoginDto,
        examples: {
            exitoso: {
                summary: 'Inicio de sesión exitoso',
                value: {
                    cli_email: 'carlosgomez@mail.com',
                    cli_contrasena: '123456',
                },
            },
            error: {
                summary: 'Credenciales inválidas',
                value: {
                    cli_email: 'carlosgomez@mail.com',
                    cli_contrasena: 'contraseña_incorrecta',
                },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Inicio de sesión exitoso, devuelve token JWT.',
        content: {
            'application/json': {
                example: {
                    message: 'Inicio de sesión exitoso.',
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    user: {
                        cli_id: 12,
                        cli_nombre: 'Carlos Gómez',
                        cli_email: 'carlosgomez@mail.com',
                    },
                },
            },
        },
    })
    @ApiResponse({
        status: 401,
        description: 'Credenciales inválidas.',
        content: {
            'application/json': {
                example: {
                    statusCode: 401,
                    message: 'Correo o contraseña incorrectos.',
                    error: 'Unauthorized',
                },
            },
        },
    })
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    // ============================================================
    // 🧑‍💼 3️⃣ Login de Administrador
    // ============================================================

    /**
     * Permite a un administrador iniciar sesión en el sistema.
     */
    @Post('login/admin')
    @ApiOperation({
        summary: 'Inicio de sesión (Administrador)',
        description:
            'Autentica a un administrador mediante sus credenciales y devuelve un token JWT.',
    })
    @ApiBody({
        type: LoginAdminDto,
        examples: {
            exitoso: {
                summary: 'Login exitoso de administrador',
                value: {
                    admin_email: 'admin@veterinaria.com',
                    admin_contrasena: 'admin123',
                },
            },
            error: {
                summary: 'Credenciales inválidas',
                value: {
                    admin_email: 'admin@veterinaria.com',
                    admin_contrasena: 'incorrecta',
                },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Administrador autenticado correctamente.',
        content: {
            'application/json': {
                example: {
                    message: 'Login exitoso.',
                    token: 'eyJh...adminToken...',
                    user: {
                        admin_id: 1,
                        admin_nombre: 'Administrador General',
                        admin_email: 'admin@veterinaria.com',
                    },
                },
            },
        },
    })
    @ApiResponse({
        status: 401,
        description: 'Credenciales inválidas.',
        content: {
            'application/json': {
                example: {
                    statusCode: 401,
                    message: 'Correo o contraseña incorrectos.',
                    error: 'Unauthorized',
                },
            },
        },
    })
    async loginAdmin(@Body() dto: LoginAdminDto) {
        return this.authService.loginAdmin(dto);
    }

    // ============================================================
    // 👷‍♂️ 4️⃣ Login de Empleado
    // ============================================================

    /**
     * Permite a un empleado iniciar sesión y obtener su token JWT.
     */
    @Post('login/empleado')
    @ApiOperation({
        summary: 'Inicio de sesión (Empleado)',
        description:
            'Autentica a un empleado mediante su correo y contraseña, devolviendo un token JWT con su información básica.',
    })
    @ApiBody({
        type: LoginEmpleadoDto,
        examples: {
            exitoso: {
                summary: 'Login exitoso de empleado',
                value: {
                    emp_email: 'juanperez@empresa.com',
                    emp_contrasena: 'empleado123',
                },
            },
            error: {
                summary: 'Credenciales incorrectas',
                value: {
                    emp_email: 'juanperez@empresa.com',
                    emp_contrasena: 'clave_invalida',
                },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Empleado autenticado correctamente.',
        content: {
            'application/json': {
                example: {
                    message: 'Inicio de sesión exitoso.',
                    token: 'eyJh...empleadoToken...',
                    user: {
                        emp_id: 8,
                        emp_nombre: 'Juan Pérez',
                        emp_email: 'juanperez@empresa.com',
                        emp_rol: 'empleado',
                    },
                },
            },
        },
    })
    @ApiResponse({
        status: 401,
        description: 'Credenciales inválidas.',
        content: {
            'application/json': {
                example: {
                    statusCode: 401,
                    message: 'Correo o contraseña incorrectos.',
                    error: 'Unauthorized',
                },
            },
        },
    })
    async loginEmpleado(@Body() dto: LoginEmpleadoDto) {
        return this.authService.loginEmpleado(dto.emp_email, dto.emp_contrasena);
    }
}
