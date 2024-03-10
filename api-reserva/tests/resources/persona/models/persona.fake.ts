import { Persona } from '@persona/models/persona.model';


export const personaStub = Persona.build({
    id: 1,
    nombre:"any_nombre",
    apellido:"any_apellido",
    correo:"any@any.com",
    nroDocumento:"5489741",
    telefono:"098564748"
});