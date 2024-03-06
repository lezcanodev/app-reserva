

export class DateService{

    /**
     * Calcula el numero de dias de diferencia entre dos fechas
     * @param from primera fecha
     * @param to segunda fecha
     * @returns numero de dias
     */
    public static calcDiffInDays(from: Date, to: Date){
        const milliseconds = DateService.getTimeUTC(to) - DateService.getTimeUTC(from);
        const days = milliseconds/(1000*60*60*24);
        return days;
    }

    /**
     * Calcula el numero de horas de diferencia entre dos fechas
     * @param to segunda fecha
     * @param from primera fecha, por defecto la fecha actual
     * @returns numero de horas
     */
    public static calcDiffInHours(to: Date, from?: Date){
        // milisegundos, tiempo calculado desde January 1, 1970, UTC hasta el tiempo actual
        from = typeof from === 'undefined' ? new Date() : from; 

        // milisegundos, tiempo calculado desde January 1, 1970, UTC hasta la fecha de entrada
        const toTime =  DateService.getTimeUTC(to);

        const hours = (DateService.getTimeUTC(from) - toTime)/(1000*60*60);

        return hours;
    }

    /**
     * Utiliza el timezone UTC y calcula el tiempo en milisegundos desde January 1, 1970, UTC hasta la fecha de entrada
     * @param tiempo en milisegundos desde  January 1, 1970, UTC hasta la fecha de entrada 
     */
    public static datesAreEquals(date1: Date, date2: Date){
        return date1.getUTCFullYear() === date2.getUTCFullYear() &&  date1.getUTCMonth() === date2.getUTCMonth() && date1.getUTCDate() === date2.getUTCDate();
    }

    /**
     * Utiliza el timezone UTC y calcula el tiempo en milisegundos desde January 1, 1970, UTC hasta la fecha de entrada
     * @param tiempo en milisegundos desde  January 1, 1970, UTC hasta la fecha de entrada 
     */
    public static getTimeUTC(from: Date){
        return Date.UTC(from.getUTCFullYear(), from.getUTCMonth()+1, from.getUTCDate(), from.getUTCHours(), from.getUTCMinutes());
    }
}