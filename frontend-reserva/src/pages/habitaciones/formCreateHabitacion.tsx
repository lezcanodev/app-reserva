import { ButtonWithIcon } from '../../components/button/buttonWithIcon';
import { Form } from '../../components/form/form';
import { FormCheckbox } from '../../components/form/formCheckbox';
import { FormInput } from '../../components/form/formInput';
import { useState } from 'react';
import { LuDoorOpen } from "react-icons/lu";


export function FormCreateHabitacion({handleCreateHabitacion}: {handleCreateHabitacion: any}){
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        piso: '',
        numero: '',
        cantCamas: '',
        tieneTelevision: '',
        tieneFrigobar: '',
        habitacion: ''
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newHabitacion = Object.fromEntries(formData);
        
        setLoading(true);
        const res = await handleCreateHabitacion({
            ...newHabitacion,
            tieneTelevision: newHabitacion.tieneTelevision === 'on',
            tieneFrigobar: newHabitacion.tieneFrigobar === 'on'
        });
        setLoading(false);
        const newErrors: any = {
            piso: '',
            numero: '',
            cantCamas: '',
            tieneTelevision: '',
            tieneFrigobar: '',
            habitacion: ''
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
       
        <FormInput label='' type='hidden' name="habitacion" error={errors.habitacion}/>

        <FormInput
            label='Piso (1 al 10)'
            type='text'
            name="piso"
            error={errors.piso}
        />
        <FormInput
            label='Numero (1 al 20)'
            type='text'
            name='numero'
            error={errors.numero}
        />
       
        <FormInput
            label='Numero de camas (1 al 4)'
            type='text'
            name='cantCamas'
            error={errors.cantCamas}
        />
        <FormCheckbox
            label='Tiene Television'
            name='tieneTelevision'
            error={errors.tieneFrigobar}
        />
        <FormCheckbox
            label='Tiene Frigobar'
            name='tieneFrigobar'
            error={errors.tieneFrigobar}
        />
        <div className='flex justify-end'>
            <ButtonWithIcon 
                icon={<LuDoorOpen/>}
                text={!loading ? 'Registrar' : 'cargando...'}
            />   
        </div>
    </Form>
}