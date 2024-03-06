import { PersonaProps} from '@persona/models/persona.model';

type BooleanFields<T> = {
    [K in keyof T]?: boolean
}

export interface SelectFieldsPersona extends BooleanFields<PersonaProps>{};

export interface PersonaFinderRepository{
    /**
     * Obtiene todas las personas
     */
    findAll(selectFields?: SelectFieldsPersona): Promise<PersonaProps[]>;
}