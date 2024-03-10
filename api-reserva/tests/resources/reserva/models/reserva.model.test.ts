import { ReservaError } from '@reserva/models/reserva.error';
import { Reserva } from '@reserva/models/reserva.model';
import { ReservaCalcMonto } from '@reserva/models/services/reservaCalcMonto.service';


describe('Test Model Reserva',  () => {

    it('Deberia lanzar ReservaError por fecha entrada invalida', () => {
        const fechaEntrada = new Date();

        expect( () => Reserva.build({
                personaId: null!,
                habitacionId: null!,
                fechaEntrada: fechaEntrada,
                fechaSalida: fechaEntrada,
                fechaReserva: null,
                montoReserva: null,
            }) ).toThrow(ReservaError);
    })

    it('Deberia lanzar ReservaError por fecha salida invalida', () => {
        const fechaEntrada = new Date();
        fechaEntrada.setDate(fechaEntrada.getDate()+1);

        expect( () => Reserva.build({
                personaId: null!,
                habitacionId: null!,
                fechaEntrada: fechaEntrada,
                fechaSalida: fechaEntrada,
                fechaReserva: null,
                montoReserva: null,
            }) ).toThrow(ReservaError);
    })

    it('Deberia crear correctamente una reserva', () => {
        const fechaEntrada = new Date();
        const fechaSalida = new Date();
        fechaEntrada.setDate(fechaEntrada.getDate()+1);
        fechaSalida.setFullYear(fechaEntrada.getFullYear()+1);

        const calcMonto = ReservaCalcMonto.calcMontoReserva(fechaEntrada, fechaSalida);

        const reserva = Reserva.build({
            personaId: null!,
            habitacionId: null!,
            fechaEntrada: fechaEntrada,
            fechaSalida: fechaSalida,
            fechaReserva: null,
            montoReserva: null,
        });

        expect(reserva instanceof Reserva).toBeTruthy();
        const reservaProps = reserva.getProps();
        expect(reservaProps.montoReserva).toBe(calcMonto);

    })

})