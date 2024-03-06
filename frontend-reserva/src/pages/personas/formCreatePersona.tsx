import { IoPersonAddOutline } from 'react-icons/io5';
import { ButtonWithIcon } from '../../components/button/buttonWithIcon';
import { Form } from '../../components/form/form';
import { FormInput } from '../../components/form/formInput';
import { useState } from 'react';


export function FormCreatePersona({handleCreatePersona}: {handleCreatePersona: any}){
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
        const newPersona = Object.fromEntries(formData);

        setLoading(true);
        const res = await handleCreatePersona(newPersona);
        setLoading(false);
        const newErrors: any = {
            nombre: '',
            apellido: '',
            nroDocumento: '',
            correo: '',
            telefono: ''
        };

        if(res !== null && res.statusCode === 400){
            const resErrors = res.errors;
            resErrors.forEach((err: any) => {
                const key = Object.keys(err)[0];
                newErrors[(key as string)] = err[key];
            });
        }
        
        setErrors(newErrors);
    }

    return <Form onSubmit={handleSubmit}>
        
        <FormInput
            label='Nombre'
            type='text'
            name="nombre"
            error={errors.nombre}
        />
        <FormInput
            label='Apellido'
            type='text'
            name='apellido'
            error={errors.apellido}
        />
       
        <FormInput
            label='Numero de documento'
            type='text'
            name='nroDocumento'
            error={errors.nroDocumento}
        />
        <FormInput
            label='Correo'
            type='text'
            name='correo'
            error={errors.correo}
        />
        <FormInput
            label='Telefono'
            type='text'
            name='telefono'
            error={errors.telefono}
        />
        <div className='flex justify-end'>
            <ButtonWithIcon 
                icon={<IoPersonAddOutline/>}
                text={!loading ? 'Registrar' : 'cargando...'}
            />   
        </div>
    </Form>
}