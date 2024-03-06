import { TbUserEdit } from "react-icons/tb";
import { ButtonWithIcon } from '../../components/button/buttonWithIcon';
import { Form } from '../../components/form/form';
import { FormInput } from '../../components/form/formInput';
import { useState } from 'react';
import { Persona } from '../../api/persona.api';


export function FormEditPersona({handleEditPersona, persona}: {handleEditPersona: any, persona: Persona}){
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        nombre: '',
        apellido: '',
        nroDocumento: '',
        correo: '',
        telefono: ''
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const editPersona = Object.fromEntries(formData);

        setLoading(true);
        const res = await handleEditPersona(editPersona, persona.id);
        setLoading(false);

        if(res !== null && res.statusCode === 400){
            const resErrors = res.errors;
            const newErrors: any = {
                nombre: '',
                apellido: '',
                nroDocumento: '',
                correo: '',
                telefono: ''
            };
            resErrors.forEach((err: any) => {
                const key = Object.keys(err)[0];
                newErrors[(key as string)] = err[key];
            });
            setErrors(newErrors);
        }

    }

    return <Form onSubmit={handleSubmit}>
        
        <FormInput
            label='Nombre'
            type='text'
            name="nombre"
            defaultValue={persona.nombre}
            error={errors.nombre}
        />
        <FormInput
            label='Apellido'
            type='text'
            name='apellido'
            defaultValue={persona.apellido}
            error={errors.apellido}
        />
       
        <FormInput
            label='Numero de documento'
            type='text'
            name='nroDocumento'
            defaultValue={persona.nroDocumento}
            error={errors.nroDocumento}
        />
        <FormInput
            label='Correo'
            type='text'
            name='correo'
            defaultValue={persona.correo}
            error={errors.correo}
        />
        <FormInput
            label='Telefono'
            type='text'
            name='telefono'
            defaultValue={persona.telefono}
            error={errors.telefono}
        />
        <div className='flex justify-end'>
            <ButtonWithIcon 
                icon={<TbUserEdit/>}
                text={!loading ? 'Editar' : 'editando...'}
            />   
        </div>
    </Form>
}