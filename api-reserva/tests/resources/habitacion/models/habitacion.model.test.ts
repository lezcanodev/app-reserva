import { HabitacionError } from '@habitacion/models/habitacion.error';
import { Habitacion } from '@habitacion/models/habitacion.model';

describe('Test Model Habitacion',  () => {

    it('Deberia lanzar HabitacionError por numero de piso no valido', () => {
        expect( () => Habitacion.build({
                piso: 0,
                numero: 3,
                cantCamas: 2,
                tieneFrigobar: true,
                tieneTelevision: true
            }) ).toThrow(HabitacionError);
    })

    it('Deberia lanzar HabitacionError por numero de habitacion no valido', () => {
        expect( () => Habitacion.build({
            piso: 1,
            numero: 300,
            cantCamas: 2,
            tieneFrigobar: true,
            tieneTelevision: true
        }) ).toThrow(HabitacionError);
    })

})