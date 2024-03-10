import { ReservaServiceChecker } from '@reserva/models/services/reservaChecker.service';



describe('Test de ReservaServiceChecker', () => {
    
    describe('Test Fecha Entrada', () => {

            it('Fecha entrada dia actual es no valida', () => {
                const fechaEntrada = new Date();
        
                expect(ReservaServiceChecker.isValidFechaEntrada(fechaEntrada)).toMatchObject({
                    message: expect.any(String)
                });
            })
        
            it('Fecha entrada un dia despues al actual es valida', () => {
                const fechaEntrada = new Date();
                fechaEntrada.setDate(fechaEntrada.getDate() + 1 );
        
                expect(ReservaServiceChecker.isValidFechaEntrada(fechaEntrada)).toBeNull();
            })

    })

    describe('Test Fecha Salida', () => {

        it('Fecha Salida igual a Fecha Entrada es no valida', () => {
            const fechaEntrada = new Date();
            const fechaSalida = new Date();

            expect(ReservaServiceChecker.isValidFechaSalida(fechaSalida, fechaEntrada)).toMatchObject({
                message: expect.any(String)
            });
        })
    
        it('Fecha Salida menor a Fecha Entrada es no valida', () => {
            const fechaEntrada = new Date();
            const fechaSalida = new Date(fechaEntrada.toISOString());
            fechaSalida.setDate(fechaSalida.getDate()-1);

            expect(ReservaServiceChecker.isValidFechaSalida(fechaSalida, fechaEntrada)).toMatchObject({
                message: expect.any(String)
            });
        });
        
        it('Fecha Salida mayor a Fecha Entrada es valida', () => {
            const fechaEntrada = new Date();
            const fechaSalida = new Date(fechaEntrada.toISOString());
            fechaSalida.setDate(fechaSalida.getDate()+1);

            expect(ReservaServiceChecker.isValidFechaSalida(fechaSalida, fechaEntrada)).toBeNull();
        });

    })

})