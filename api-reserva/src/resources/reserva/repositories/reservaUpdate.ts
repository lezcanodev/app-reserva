import { AppDataSource } from '@datasource/mysql';
import { ReservaEntity } from '@datasource/mysql/entities';
import { ReservaUpdateDTO, ReservaUpdateRepository } from './interfaces/reservaUpdate.repository';


/**
 * Se encarga de actualizar una reserva en la base de datos
 */
export class ReservaUpdate implements ReservaUpdateRepository{
    async update(reserva: ReservaUpdateDTO): Promise<void> {
        const reservaRepository = AppDataSource.getRepository(ReservaEntity);
    
        await reservaRepository.update({ id: reserva.reservaId }, (reserva.reserva as any) );
    }
}

export const reservaUpdate = new ReservaUpdate();