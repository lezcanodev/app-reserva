import ReservaProps from '@reserva/models/reserva.model';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { HabitacionEntity } from './habitacion.entity';
import { PersonaEntity } from './persona.entity';

@Entity({name: 'reservas'})
export class ReservaEntity implements ReservaProps{

    @PrimaryColumn()
    id: number;

    @Column({
        name: 'persona_id'
    })
    personaId: number;

    @Column({
        name: 'habitacion_id'
    })
    habitacionId: number;

    @Column({
        name: 'fecha_reserva'
    })
    fechaReserva: Date;

    @Column({
        name: 'fecha_entrada'
    })
    fechaEntrada: Date;

    @Column({
        name: 'fecha_salida'
    })
    fechaSalida: Date;

    @Column({
        name: 'monto_reserva'
    })
    montoReserva: number;

    
    @ManyToOne(() => HabitacionEntity, (hb) => hb.reservas)
    @JoinColumn({
        name: 'habitacion_id'
    })
    habitacion: HabitacionEntity

    @ManyToOne(() => PersonaEntity, (pe) => pe.reservas)
    @JoinColumn({
        name: 'persona_id'
    })
    persona: PersonaEntity

}