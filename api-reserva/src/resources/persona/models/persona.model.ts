import { BaseModel } from '@core/models/baseModel.model';

export interface PersonaProps{
    id?: number;
    nombre: string;
    apellido: string;
    nroDocumento: string;
    correo: string;
    telefono: string;
}

export class Persona extends BaseModel<PersonaProps>{

    public static build(props: PersonaProps){
        return new Persona(props);
    }

}