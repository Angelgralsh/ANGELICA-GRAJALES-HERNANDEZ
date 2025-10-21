import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Pelicula } from 'src/peliculas/pelicula.entity';
import { Sala } from 'src/sala/sala.entity';

@Entity()
export class Funcion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Pelicula, { eager: true })
  pelicula: Pelicula;

  @ManyToOne(() => Sala, { eager: true })
  sala: Sala;

  @Column({ type: 'timestamp' })
  fechaHora: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column('int')
  asientosDisponibles: number;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}