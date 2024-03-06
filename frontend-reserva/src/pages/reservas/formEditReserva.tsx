import { ButtonWithIcon } from '../../components/button/buttonWithIcon';
import { FormInput } from '../../components/form/formInput';
import { useEffect, useRef, useState } from 'react';
import { Reserva, findAllFreeHabitacionesReserva } from '../../api/reserva.api';
import FormWithRef  from '../../components/form/form';
import { parseDateFromDateISO, parseInputDateWithTimeToISO, parseTimeFromDateISO } from '../../helpers/dateHelper';
import { FormSelect } from '../../components/form/formSelect';
import { numberWithPoint } from '../../helpers/numberHelper';
import { Persona } from '../../api/persona.api';
import { LuBookPlus } from 'react-icons/lu';

interface FormEditReservaProps{
    handleEditReserva: any;
    reserva: Reserva;
    personas: Persona[];
    loadingPersonas: boolean;
}

export function FormEditReserva({handleEditReserva, reserva, personas, loadingPersonas}: FormEditReservaProps){
    const [loading, setLoading] = useState(false);
    const [freeHabitaciones, setFreeHabitaciones] = useState<{id: number; piso: number; numero: number}[]>([]);
    const [cost, setCost] = useState<number>(0);
    const formRef = useRef(null);
    const [errors, setErrors] = useState({
        personaId: '',
        habitacionId: '',
        fechaEntrada: '',
        fechaSalida: '',
        habitacion: ''
    });

    useEffect(() => {
        findAllFreeHabitacionesReserva(reserva.fechaEntrada, reserva.fechaSalida)
        .then(res => {
            if(res.statusCode !== 200){
                setFreeHabitaciones([]);
                setCost(0);
                return;
            }
            setFreeHabitaciones(res.data!.freeHabitaciones);
            setCost(res.data!.cost);
        })
    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const editReserva = Object.fromEntries(formData);

        setLoading(true);
        const res = await handleEditReserva({
            personaId: editReserva.personaId,
            habitacionId: editReserva.habitacionId,  
            fechaEntrada: parseInputDateWithTimeToISO(editReserva.fechaEntrada.toString(), editReserva.fechaEntradaTime.toString()),
            fechaSalida: parseInputDateWithTimeToISO(editReserva.fechaSalida.toString(), editReserva.fechaSalidaTime.toString())
        }, reserva.id);
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
                newErrors[(key as string)] = err[key];
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
            if(res.statusCode === 400){
                alert((res.errors as any)[0].fechaSalida);
            }
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
                        defaultValue={parseDateFromDateISO(reserva.fechaEntrada)}
                        onInput={handleChangeDate}
                    />
                    <FormInput
                        label=''
                        type='time'
                        defaultValue={parseTimeFromDateISO(reserva.fechaEntrada)}
                        name="fechaEntradaTime"
                        error={errors.fechaEntrada}
                    />
                </div>
                <div className='grid gap-2 w-full'>
                    <FormInput
                        label='Salida'
                        type='date'
                        name='fechaSalida'
                        defaultValue={parseDateFromDateISO(reserva.fechaSalida)}
                        onInput={handleChangeDate}
                    />
                    <FormInput
                        label=''
                        type='time'
                        name="fechaSalidaTime"
                        defaultValue={parseTimeFromDateISO(reserva.fechaSalida)}
                        error={errors.fechaSalida}
                    />
                </div>
            </div>
        
            {freeHabitaciones.length === 0 ? (
                <FormSelect
                    label='Habitacion'
                    type='text'
                    name='habitacionId'
                    error={errors.habitacionId}>
                        <FormSelect.Option
                            value={reserva.habitacion.id}
                            title={`actual: piso: ${reserva.habitacion.piso} - nro: ${reserva.habitacion.numero}`}
                        />
                </FormSelect>
            ) : (
                <FormSelect
                    label='Habitacion'
                    type='text'
                    name='habitacionId'
                    error={errors.habitacionId}>
                    <FormSelect.Option
                        value={reserva.habitacion.id}
                        title={`actual: piso: ${reserva.habitacion.piso} - nro: ${reserva.habitacion.numero}`}
                    />
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
                        selected={persona.id === reserva.persona?.id}
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
                    text={!loading ? 'Actualizar' : 'cargando...'}
                />   
            </div>
        </FormWithRef>
}