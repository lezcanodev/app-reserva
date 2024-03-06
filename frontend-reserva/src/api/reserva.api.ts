import { ApiResponse, baseApi } from './api';
import { Habitacion } from './habitacion.api';
import { Persona } from './persona.api';

const baseReservaUri = baseApi('reservas');

export interface Reserva{
    id: number;
    personaId: number;
    habitacionId: number;
    fechaReserva: string; //fechas string ISO 8601
    fechaEntrada: string; //fechas string ISO 8601
    fechaSalida: string;  //fechas string ISO 8601
    montoReserva: number;
    habitacion: Habitacion;
    persona: Persona;
}

export const findAllReserva = async (): Promise<ApiResponse<Reserva[]>> => {
    const response = await fetch(baseReservaUri);
    const reservas = await response.json();
   
    return {
        statusCode: response.status,
        data: reservas.data
    }
}

export const findAllFreeHabitacionesReserva = async (fechaEntradaISO: string, fechaSalidaISO: string ):
 Promise<ApiResponse<{cost: number; freeHabitaciones: {id: number; piso: number; numero: number;}[] }>> => {
    const response = await fetch(`${baseReservaUri}/free-habitaciones?fehcaEntrada=${fechaEntradaISO}&fechaSalida=${fechaSalidaISO}`);
    const reservas = await response.json();
    
    if(response.status === 400){
        return {
            statusCode: response.status,
            errors: reservas.errors
        }
    }

    return {
        statusCode: response.status,
        data: {
            cost: reservas.cost,
            freeHabitaciones: [...reservas.data]
        }
    }
}


export const createReserva = async (reserva: Omit<Reserva, 'id' | 'fechaEntrada' |  'montoReserva' | 'habitacion' | 'persona' >): Promise<ApiResponse<any>> => {
   
    const response = await fetch(baseReservaUri, {
        method: 'POST',
        body: JSON.stringify(reserva),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    
    if(response.status === 201){
        return {
            statusCode: response.status,
            data: data.data
        };
    }

    if(response.status === 400){
        return {
            statusCode: response.status,
            errors: data.errors
        };
    }

    return {
        statusCode: 500,
        errors: {'general': 'Ocurrio un error'}
    };

}



export const editReserva = async (reserva: Omit<Reserva, 'id' | 'habitacion' | 'persona'>, reservaId: number): Promise<ApiResponse<any>> => {
    console.log("editar reserva")
    const response = await fetch(baseReservaUri, {
        method: 'PUT',
        body: JSON.stringify({reservaId: reservaId, ...reserva}),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();

    if(response.status === 200){
        return {
            statusCode: response.status,
            data: data.data
        };
    }

    if(response.status === 400){
        return {
            statusCode: response.status,
            errors: data.errors
        };
    }

    return {
        statusCode: 500,
        errors: {'general': 'Ocurrio un error'}
    };

}



export const deleteReserva = async (reservaId: number): Promise<ApiResponse<any>> => {
    const response = await fetch(baseReservaUri, {
        method: 'DELETE',
        body: JSON.stringify({reservaId: reservaId}),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if(response.status === 204){
        return {
            statusCode: response.status,
            data: null
        };
    }

    if(response.status === 400){
        const data = await response.json();
        return {
            statusCode: response.status,
            errors: data.errors
        };
    }

    return {
        statusCode: 500,
        errors: {'general': 'Ocurrio un error'}
    };

}