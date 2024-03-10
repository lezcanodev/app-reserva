import { Reserva } from '@reserva/models/reserva.model';
import { habitacionStub } from '@tests/resources/habitacion/models/habitacion.fake';
import { personaStub } from '@tests/resources/persona/models/persona.fake';

const fechaEntrada = new Date();
fechaEntrada.setUTCDate(fechaEntrada.getUTCDate()+1);
const fechaSalida = new Date();
fechaSalida.setUTCDate(fechaSalida.getUTCDate()+2);

export const reservaStub =  Reserva.build({
    id: 1,
    personaId: personaStub.getProps().id!,
    habitacionId: habitacionStub.getProps().id!,
    fechaEntrada: fechaEntrada,
    fechaSalida: fechaSalida,
    fechaReserva: null,
    montoReserva: null
})