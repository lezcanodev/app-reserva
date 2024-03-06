import { ApiResponse, baseApi } from './api';

const basePersonaUri = baseApi('personas');

export interface Persona{
    id: number;
    nombre: string;
    apellido: string;
    nroDocumento: number;
    correo: string;
    telefono: string;
}

export const findAllPersonas = async (): Promise<ApiResponse<Persona[]>> => {
    const response = await fetch(basePersonaUri);
    const personas = await response.json();

    return {
        statusCode: response.status,
        data: personas.data
    };
}


export const createPersona = async (persona: Omit<Persona, 'id'>): Promise<ApiResponse<any>> => {
    const response = await fetch(basePersonaUri, {
        method: 'POST',
        body: JSON.stringify(persona),
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

export const editPersona = async (persona: Omit<Persona, 'id'>, personaId: number): Promise<ApiResponse<any>> => {
    const response = await fetch(basePersonaUri, {
        method: 'PUT',
        body: JSON.stringify({personaId, ...persona}),
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

export const deletePersona = async (personaId: number): Promise<ApiResponse<any>> => {
    const response = await fetch(basePersonaUri, {
        method: 'DELETE',
        body: JSON.stringify({personaId: personaId}),
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