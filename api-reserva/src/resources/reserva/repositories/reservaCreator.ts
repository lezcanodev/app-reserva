import { Persona } from '@persona/models/persona.model';
import { ReservaCreatorRepository } from './interfaces/reservaCreator.repository';
import { AppDataSource } from '@datasource/mysql';
import { PersonaEntity, ReservaEntity } from '@datasource/mysql/entities';
import { Reserva } from '@reserva/models/reserva.model';


/**
 * Se encarga de crear una nueva reserva en la base de datos
 */
export class ReservaCreator implements ReservaCreatorRepository{
    async create(reserva: Reserva): Promise<void> {
        
        const reservaRepository = AppDataSource.getRepository(ReservaEntity);
        const reservaProps = reserva.getProps();

       await reservaRepository.save({
            personaId: reservaProps.personaId,
            habitacionId: reservaProps.habitacionId,
            fechaEntrada: reservaProps.fechaEntrada,
            fechaSalida: reservaProps.fechaSalida,
            fechaReserva: reservaProps.fechaReserva!,
            montoReserva: reservaProps.montoReserva!
        });

    }
}

export const reservaCreator = new ReservaCreator();