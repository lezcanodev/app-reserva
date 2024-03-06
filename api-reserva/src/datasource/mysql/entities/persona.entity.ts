import {PersonaProps} from '@persona/models/persona.model';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ReservaEntity } from './reserva.entity';


@Entity({name: 'personas'})
export class PersonaEntity implements PersonaProps{
    @PrimaryColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column({
        name: 'nro_documento'
    })
    nroDocumento: string;

    @Column()
    correo: string;
    
    @Column()
    telefono: string;

    @OneToMany(() => ReservaEntity, (re) => re.persona)
    reservas: ReservaEntity[]
}