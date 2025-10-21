import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Pelicula } from '../peliculas/pelicula.entity';
import { Sala } from '../sala/sala.entity';
import { Ticket } from './ticket.entity';

@Entity()
export class Funcion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp')
  fechaHora: Date;

  @Column('decimal')
  precio: number;

  @ManyToOne(() => Pelicula, (p) => p.funciones)
  pelicula: Pelicula;

  @ManyToOne(() => Sala, (s) => s.funciones)
  sala: Sala;

  @OneToMany(() => Ticket, (t) => t.funcion)
  tickets: Ticket[];
}