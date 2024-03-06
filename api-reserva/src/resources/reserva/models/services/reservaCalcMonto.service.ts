import { DateService } from '@core/models/services/date.service';


export class ReservaCalcMonto{

    public static readonly PRECIO_POR_DIA = 120000; //en guaranies Gs.

    /**
     * Calcula el monto a pagar en guaranies por la reserva segun las fechas de entrada
     * y salida
     * @param fechaEntrada 
     * @param fechaSalida
     * @returns monto en guaranies
     */
    public static calcMontoReserva(fechaEntrada: Date, fechaSalida: Date){
        //sumamos 1 para contar la fecha de entrada
        const days = 1 + DateService.calcDiffInDays(fechaEntrada, fechaSalida);
        return days*ReservaCalcMonto.PRECIO_POR_DIA;
    }
    
}

