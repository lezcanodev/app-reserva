import { BaseModel } from '@core/models/baseModel.model';
import { DateService } from '@core/models/services/date.service';
import { ReservaError } from './reserva.error';
import { ReservaServiceChecker } from './services/reservaChecker.service';
import { ReservaCalcMonto } from './services/reservaCalcMonto.service';

export default interface ReservaProps{
    id?: number;
    personaId: number;
    habitacionId: number;
    fechaReserva: Date | null;
    fechaEntrada: Date;
    fechaSalida: Date;
    montoReserva: number | null;
}

export class Reserva extends BaseModel<ReservaProps>{

    private constructor(private readonly reservaProps: ReservaProps){
        super(reservaProps);
        this.setFechaReserva();
        this.calcMontoReserva();
    }

    public setFechaReserva(){
        if(this.reservaProps.fechaReserva !== null) return;
        this.reservaProps.fechaReserva = new Date();
    }

    public calcMontoReserva(){
        if(this.reservaProps.montoReserva !== null) return;
        this.reservaProps.montoReserva = ReservaCalcMonto.calcMontoReserva(this.reservaProps.fechaEntrada, this.reservaProps.fechaSalida);
    }

    public static build(props: ReservaProps){
        const validFechaEntrada = ReservaServiceChecker.isValidFechaEntrada(props.fechaEntrada);
        const validFechaSalida = ReservaServiceChecker.isValidFechaSalida(props.fechaSalida, props.fechaEntrada);

        if(validFechaEntrada !== null){
            new ReservaError(validFechaEntrada.message, 'fechaEntrada');
        }

        if(validFechaSalida != null){
            new ReservaError(validFechaSalida.message, 'fechaSalida');
        }

        return new Reserva(props);
    }
}