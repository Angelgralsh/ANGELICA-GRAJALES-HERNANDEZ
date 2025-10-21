import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Funcion } from './funcion.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Usuario, (u) => u.tickets)
  usuario: Usuario;

  @ManyToOne(() => Funcion, (f) => f.tickets)
  funcion: Funcion;

  @Column()
  asiento: string;

  @Column('timestamp')
  fechaCompra: Date;
}