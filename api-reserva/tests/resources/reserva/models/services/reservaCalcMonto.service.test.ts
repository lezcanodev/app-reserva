import { ReservaCalcMonto } from '@reserva/models/services/reservaCalcMonto.service';

describe('Test de ReservaCalcMonto', () => {
    
    it('Calculo monto por 1 dia de reserva', () => {
        const fechaEntrada = new Date();
        const fechaSalida = new Date(fechaEntrada.toISOString());
        fechaSalida.setDate(fechaSalida.getDate()+1);
        const expectResult = ReservaCalcMonto.PRECIO_POR_DIA;
        
        expect(ReservaCalcMonto.calcMontoReserva(fechaEntrada, fechaSalida)).toBe(expectResult*2);
    });

    it('Calculo monto por 2 dia de reserva', () => {
        const fechaEntrada = new Date();
        const fechaSalida = new Date(fechaEntrada.toISOString());
        fechaSalida.setDate(fechaSalida.getDate()+2);
        const expectResult = ReservaCalcMonto.PRECIO_POR_DIA*3;
        
        expect(ReservaCalcMonto.calcMontoReserva(fechaEntrada, fechaSalida)).toBe(expectResult);
    });

})



