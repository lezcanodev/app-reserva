import { RequestInputError } from '@core/validators/base.validator';
import { AppDataSource } from '@datasource/mysql';
import { HabitacionEntity } from '@datasource/mysql/entities/habitacion.entity';
import { Not } from 'typeorm';


export class HabitacionValidatorHelper{
    /**
     * Verificamos que el piso y numero no exista en la base de datos 
     * @param piso 
     * @param numero 
     * @param habitacionId 
     * @returns 
     */
    public static async isFreeHabitacion(piso: number, numero: number, habitacionId?: number) : Promise<RequestInputError>{
        let existeHabitacion: number = 0;
        const habitacionRepository = AppDataSource.getRepository(HabitacionEntity);

        if(typeof piso !== 'undefined' && typeof numero !== 'undefined'){
            if(typeof habitacionId !== 'undefined'){
                existeHabitacion = await habitacionRepository.countBy({
                    id: Not(habitacionId),
                    piso: piso,
                    numero: numero
                });
            }else{
                existeHabitacion = await habitacionRepository.countBy({
                    piso: piso,
                    numero: numero
                });
            }

        }else if((typeof piso !== 'undefined' || typeof numero !== 'undefined') && typeof habitacionId !== 'undefined'){
            const currentHabitacion = await habitacionRepository.findOne({
                select: {piso: true, numero: true},
                where: { id: habitacionId}
            });

            if(typeof piso !== 'undefined'){
                existeHabitacion = await habitacionRepository.countBy({
                    id: Not(habitacionId),
                    piso: piso,
                    numero: currentHabitacion!.numero
                });
            }else{
                existeHabitacion = await habitacionRepository.countBy({
                    id: Not(habitacionId),
                    piso: currentHabitacion!.piso,
                    numero: numero
                });
            }
        }

        if(existeHabitacion > 0){
            return {errors: [{ habitacion: 'ya existe una habitacion en el mismo piso y numero' }]};
        }

        return {errors: []};
    }
}