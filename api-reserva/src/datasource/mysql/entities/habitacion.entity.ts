import HabitacionProps from '@habitacion/models/habitacion.model';
import {  Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ReservaEntity } from './reserva.entity';


@Entity({name: 'habitaciones'})
export class HabitacionEntity implements HabitacionProps{
    @PrimaryColumn()
    id: number;

    @Column({
        name: 'habitacion_piso'
    })
    piso: number;

    @Column({
        name: 'habitacion_nro'
    })
    numero: number;

    @Column({
        name: 'cant_camas'
    })
    cantCamas: number;

    @Column({
        name: 'tiene_television'
    })
    tieneTelevision: boolean;

    @Column({
        name: 'tiene_frigobar'
    })
    tieneFrigobar: boolean;

    @OneToMany(() => ReservaEntity, (re) => re.habitacion)
    reservas: ReservaEntity[]
}