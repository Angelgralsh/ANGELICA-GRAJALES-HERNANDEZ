// src/peliculas/pelicula.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Funcion } from 'src/funcion/funcion.entity'; // 👈 importa la entidad Funcion

@Entity()
export class Pelicula {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column()
  genero: string;

  @Column('int')
  duracion: number;

  @Column({ nullable: true })
  sinopsis?: string;

  @Column({ default: true })
  activo: boolean;

  // 🔹 Relación inversa con Funcion
  @OneToMany(() => Funcion, (funcion) => funcion.pelicula)
  funciones: Funcion[];
}