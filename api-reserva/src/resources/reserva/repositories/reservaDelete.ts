import { AppDataSource } from '@datasource/mysql';
import { PersonaEntity, ReservaEntity } from '@datasource/mysql/entities';
import { ReservaDeleteRepository } from './interfaces/reservaDelete.repository';


/**
 * Se encarga de eliminar una  reserva de la base de datos
 */
export class ReservaDelete implements ReservaDeleteRepository{
    async delete(reservaId: number): Promise<void> {
        const reservaRepository = AppDataSource.getRepository(ReservaEntity);
        await reservaRepository.delete({ id: reservaId });
    }
}

export const reservaDelete = new ReservaDelete();