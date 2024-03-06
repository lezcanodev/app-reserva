

export function baseApi(resource: string){
    return `http://localhost:3001/${resource}`
   //return `https://api-reserva-sw3g.onrender.com/${resource}`;
}

export interface ApiResponse<T>{
    statusCode: number;
    data?: T;
    errors?: Record<string, string>
}