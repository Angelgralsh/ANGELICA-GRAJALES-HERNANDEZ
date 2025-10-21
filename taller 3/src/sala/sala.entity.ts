import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  OneToMany 
} from 'typeorm';
import { Funcion } from '../funcion/funcion.entity'; // ajusta la ruta si tu carpeta se llama distinto

@Entity()
export class Sala {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column('int')
  capacidad: number;

  @Column()
  tipo: string; // ejemplo: "2D", "3D", "IMAX", "VIP"

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // relación añadida
  @OneToMany(() => Funcion, (funcion) => funcion.sala)
  funciones: Funcion[];
}