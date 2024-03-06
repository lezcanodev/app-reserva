import { ApiResponse, baseApi } from './api';

const baseHabitacionUri = baseApi('habitaciones');

export interface Habitacion{
    id: number;
    piso: number;
    numero: number;
    cantCamas: number;
    tieneTelevision: boolean;
    tieneFrigobar: boolean;
}

export const findAllPHabitacion = async (): Promise<ApiResponse<Habitacion[]>> => {
    const response = await fetch(baseHabitacionUri);
    const habitaciones = await response.json();
   
    return {
        statusCode: response.status,
        data: habitaciones.data
    };
}


export const createHabitacion = async (habitacion: Omit<Habitacion, 'id'>): Promise<ApiResponse<any>> => {
   
    const response = await fetch(baseHabitacionUri, {
        method: 'POST',
        body: JSON.stringify(habitacion),
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

export const editHabitacion = async (habitacion: Omit<Habitacion, 'id'>, habitacionId: number): Promise<ApiResponse<any>> => {
    
    const response = await fetch(baseHabitacionUri, {
        method: 'PUT',
        body: JSON.stringify({habitacionId: habitacionId, ...habitacion}),
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

export const deleteHabitacion = async (habitacionId: number): Promise<ApiResponse<any>> => {
    const response = await fetch(baseHabitacionUri, {
        method: 'DELETE',
        body: JSON.stringify({habitacionId: habitacionId}),
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