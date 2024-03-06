import { DateService } from '@core/models/services/date.service';

export class ReservaServiceChecker{

    /**
     * Verifica que la fecha de entrada sea mayor a la fecha actual
     * @param fechaEntrada 
     */
    public static isValidFechaEntrada(fechaEntrada: Date){
        const currentTime = new Date();

        const diffDays = DateService.calcDiffInDays(currentTime, fechaEntrada);
       
        if(diffDays <= 0){
            return {
                message: 'fecha entrada debe ser mayor a la fecha actual'
            };
        }
        return null;
    }

    /**
     * Verifica que la fecha de salida sea mayor a la fecha de entrada
     * @param fechaSalida 
     * @param fechaEntrada 
     */
    public static isValidFechaSalida(fechaSalida: Date, fechaEntrada: Date){
        const diffDays = DateService.calcDiffInDays(fechaEntrada, fechaSalida);
        if(diffDays <= 0){
            return {
                message: 'fecha salida debe ser mayor a la fecha de entrada'
            };
        }
        return null;
    }


}