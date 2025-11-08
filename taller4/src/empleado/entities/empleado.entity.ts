/**
 * Entidad que representa un empleado dentro del sistema.
 *
 * Define la estructura de la tabla `empleados` en la base de datos
 * y sus relaciones con las entidades `Tienda` y `Venta`.
 */

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { Tienda } from '../../tienda/entities/tienda.entity';
import { Venta } from '../../venta/entities/venta.entity';

@Entity('empleados')
export class Empleado {
    @PrimaryGeneratedColumn()
    emp_id: number;

    @Column({ length: 100 })
    emp_nombre: string;

    @Column({ unique: true, length: 100 })
    emp_email: string;

    @Column({ select: false, nullable: false })
    emp_contrasena: string;

    @Column({ length: 50 })
    emp_cargo: string;

    @Column({ default: true })
    emp_activo: boolean;

    @ManyToOne(() => Tienda, (tienda) => tienda.empleados, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'tienda_id' })
    tienda: Tienda;

    @Column({ nullable: true })
    tienda_id: number;

    @OneToMany(() => Venta, (venta) => venta.empleado)
    ventas: Venta[];
}
