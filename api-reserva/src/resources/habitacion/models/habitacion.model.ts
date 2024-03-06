import { BaseModel } from '@core/models/baseModel.model';
import { HabitacionError } from './habitacion.error';


export default interface HabitacionProps{
    id?: number;
    piso: number;
    numero: number;
    cantCamas: number;
    tieneTelevision: boolean;
    tieneFrigobar: boolean;
}

export class Habitacion extends BaseModel<HabitacionProps>{

    public static readonly MAX_PISOS = 10;
    public static readonly MIN_PISOS = 1;

    public static readonly MAX_NRO = 20;
    public static readonly MIN_NRO = 1;

    public static readonly MAX_CAMAS = 4;
    public static readonly MIN_CAMAS = 1;

    public static build(props: HabitacionProps){

        if(!(props.piso >= Habitacion.MIN_PISOS && props.piso <= Habitacion.MAX_PISOS)){
            new HabitacionError(`El numero de piso debe estar entre ${Habitacion.MAX_PISOS} y ${Habitacion.MAX_PISOS}`, 'piso');
        }

        if(!(props.numero >= Habitacion.MIN_NRO && props.numero <= Habitacion.MAX_NRO)){
            new HabitacionError(`El numero de la habitacion debe estar entre ${Habitacion.MIN_NRO} y ${Habitacion.MAX_NRO}`, 'numero');
        }

        if(!(props.cantCamas > Habitacion.MIN_CAMAS && props.cantCamas <= Habitacion.MAX_CAMAS)){
            new HabitacionError(`El numero de camas debe estar entre ${Habitacion.MIN_CAMAS} y ${Habitacion.MAX_CAMAS}`, 'cantCamas');
        }

        return new Habitacion(props);
    }
}