import { ButtonWithIcon } from '../../components/button/buttonWithIcon';
import FormWithRef  from '../../components/form/form';
import { useRef, useState } from 'react';
import { FormSelect } from '../../components/form/formSelect';
import { useApi } from '../../hooks/useApi';
import { Persona, findAllPersonas } from '../../api/persona.api';
import { numberWithPoint } from '../../helpers/numberHelper';
import { parseInputDateWithTimeToISO } from '../../helpers/dateHelper';
import { LuBookPlus } from "react-icons/lu";
import {FormInput} from '../../components/form/formInput';
import { findAllFreeHabitacionesReserva } from '../../api/reserva.api';

export function FormCreateReserva({handleCreateReserva}: {handleCreateReserva: any}){
    const [personas, loadingPersonas] = useApi<Persona[]>(findAllPersonas, []);
    const [freeHabitaciones, setFreeHabitaciones] = useState<{id: number; piso: number; numero: number}[]>([]);
    const [cost, setCost] = useState<number>(0);
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        personaId: '',
        habitacionId: '',
        fechaEntrada: '',
        fechaSalida: '',
        habitacion: ''
    });


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newReserva = Object.fromEntries(formData);

        setLoading(true);
        const res = await handleCreateReserva({
            personaId: newReserva.personaId,
            habitacionId: newReserva.habitacionId,  
            fechaEntrada: parseInputDateWithTimeToISO(newReserva.fechaEntrada.toString(), newReserva.fechaEntradaTime.toString()),
            fechaSalida: parseInputDateWithTimeToISO(newReserva.fechaSalida.toString(), newReserva.fechaSalidaTime.toString())
        });
        setLoading(false);
        const newErrors: any = {
            personaId: '',
            habitacionId: '',
            fechaEntrada: '',
            fechaSalida: '',
            habitacion: ''
        };

        if(res !== null && res.statusCode === 400){
            const resErrors = res.errors;
            resErrors.forEach((err: any) => {
                const key = Object.keys(err)[0];
                newErrors[key] = err[key];
            });
        }
        setErrors(newErrors);
    }

    const handleChangeDate = () => {
        const formData = new FormData(formRef.current!);
        const form = Object.fromEntries(formData);
        let fechaEntrada = form.fechaEntrada.toString().trim();
        let fechaSalida = form.fechaSalida.toString().trim();


        if(fechaEntrada.length === 0 || fechaSalida.length === 0) return;
        fechaEntrada= parseInputDateWithTimeToISO(fechaEntrada, form.fechaEntradaTime.toString());
        fechaSalida= parseInputDateWithTimeToISO(fechaSalida, form.fechaEntradaTime.toString());
        
        findAllFreeHabitacionesReserva(fechaEntrada, fechaSalida)
        .then(res => {
            if(res.statusCode !== 200){
                setFreeHabitaciones([]);
                setCost(0);
                return;
            }
            setFreeHabitaciones(res.data!.freeHabitaciones);
            setCost(res.data!.cost);
        })
    }

    return <FormWithRef onSubmit={handleSubmit} ref={formRef}>

        <FormInput label='' type='hidden' name="habitacion" error={errors.habitacion} />

        <div className='w-full flex gap-2'>
            <div className='grid gap-2 w-full'>
                <FormInput
                    label='Entrada'
                    type='date'
                    name="fechaEntrada"
                    onInput={handleChangeDate}
                />
                <FormInput
                    label=''
                    type='time'
                    name="fechaEntradaTime"
                    error={errors.fechaEntrada}
                />
            </div>
            <div className='grid gap-2 w-full'>
                <FormInput
                    label='Salida'
                    type='date'
                    name='fechaSalida'
                    onInput={handleChangeDate}
                />
                <FormInput
                    label=''
                    type='time'
                    name="fechaSalidaTime"
                    error={errors.fechaSalida}
                />
            </div>
        </div>
       
        {freeHabitaciones.length === 0 ? (
            <>No hay habitaciones disponibles en ese rango de fechas</>
        ) : (
            <FormSelect
                label='Habitacion'
                type='text'
                name='habitacionId'
                error={errors.habitacionId}>
                {freeHabitaciones.map((habitacion) => (
                    <FormSelect.Option
                        key={`formCreateReserva${habitacion.id}`}
                        value={habitacion.id}
                        title={`piso: ${habitacion.piso} - nro: ${habitacion.numero}`}
                    />
                ))}
            </FormSelect>
        )}

        <FormSelect
            label='Persona'
            type='text'
            name='personaId'
            error={errors.personaId}>
            {loadingPersonas ? (<FormSelect.Option title='Cargando personas...' value={null} />) 
            : (<>{personas.map((persona) => (
                <FormSelect.Option
                    key={`formCreateReserva${persona.id}`}
                    value={persona.id}
                    title={`${numberWithPoint(persona.nroDocumento)} - ${persona.nombre} ${persona.apellido}`}
                />
            ))}</>)}
        </FormSelect>
        
        <div className='font-bold text-end mt-10'>
            Total a pagar: {numberWithPoint(cost)} Gs.
        </div>

        <div className='flex justify-end'>
            <ButtonWithIcon 
                icon={<LuBookPlus/>}
                text={!loading ? 'Registrar' : 'cargando...'}
            />   
        </div>
    </FormWithRef>
}