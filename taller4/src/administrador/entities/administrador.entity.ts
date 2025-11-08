import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as argon2 from 'argon2';

@Entity('administradores')
export class Administrador {
    @PrimaryGeneratedColumn()
    adm_id: number;

    @Column({ length: 100 })
    adm_nombre: string;

    @Column({ unique: true, length: 50 })
    adm_usuario: string;

    @Column({ select: false })
    adm_contrasena: string;

    @Column({ unique: true, length: 100 })
    adm_correo: string;

    @Column({ default: true })
    adm_activo: boolean;

    // Evitar doble hash: solo hashear si NO está hasheada
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.adm_contrasena && !this.adm_contrasena.startsWith('$argon2')) {
            this.adm_contrasena = await argon2.hash(this.adm_contrasena);
        }
    }

    async validarContrasena(plainPassword: string): Promise<boolean> {
        return await argon2.verify(this.adm_contrasena, plainPassword);
    }
}
