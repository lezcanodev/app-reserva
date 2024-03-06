import { TbUserEdit } from "react-icons/tb";
import { ButtonWithIcon } from '../../components/button/buttonWithIcon';
import { Form } from '../../components/form/form';
import { FormInput } from '../../components/form/formInput';
import { useState } from 'react';
import { Habitacion } from '../../api/habitacion.api';
import { FormCheckbox } from '../../components/form/formCheckbox';


export function FormEditHabitacion({handleEditHabitacion, habitacion}: {handleEditHabitacion: any, habitacion: Habitacion}){
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
        const editHabitacion = Object.fromEntries(formData);

        setLoading(true);
        const res = await handleEditHabitacion({
            ...editHabitacion,
            tieneTelevision: editHabitacion.tieneTelevision === 'on',
            tieneFrigobar: editHabitacion.tieneFrigobar === 'on'
        }, habitacion.id);
        setLoading(false);

        if(res !== null && res.statusCode === 400){
            const resErrors = res.errors;
            const newErrors: any = {
                piso: '',
                numero: '',
                cantCamas: '',
                tieneTelevision: '',
                tieneFrigobar: '',
                habitacion: ''
            };
            resErrors.forEach((err: any) => {
                const key = Object.keys(err)[0];
                newErrors[(key as string)] = err[key];
            });
            setErrors(newErrors);
        }

    }

    return <Form onSubmit={handleSubmit}>
        
        <FormInput label='' type='hidden' name="habitacion" error={errors.habitacion}/>

        <FormInput
            label='Piso (1 al 10)'
            type='text'
            name="piso"
            defaultValue={habitacion.piso}
            error={errors.piso}
        />
        <FormInput
            label='Numero (1 al 20)'
            type='text'
            name='numero'
            defaultValue={habitacion.numero}
            error={errors.numero}
        />
        <FormInput
            label='Numero de camas (1 al 4)'
            type='text'
            name='cantCamas'
            defaultValue={habitacion.cantCamas}
            error={errors.cantCamas}
        />
        <FormCheckbox
            label='Tiene Television'
            name='tieneTelevision'
            defaultChecked={habitacion.tieneTelevision}
            error={errors.tieneFrigobar}
        />
        <FormCheckbox
            label='Tiene Frigobar'
            name='tieneFrigobar'
            defaultChecked={habitacion.tieneFrigobar}
            error={errors.tieneFrigobar}
        />
        <div className='flex justify-end'>
            <ButtonWithIcon 
                icon={<TbUserEdit/>}
                text={!loading ? 'Editar' : 'editando...'}
            />   
        </div>
    </Form>
}