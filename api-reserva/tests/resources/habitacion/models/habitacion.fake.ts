import { Habitacion } from '@habitacion/models/habitacion.model';

export const habitacionStub = Habitacion.build({
    id: 1,
    cantCamas: 2,
    numero: 3,
    piso:1,
    tieneFrigobar: false,
    tieneTelevision: true
});