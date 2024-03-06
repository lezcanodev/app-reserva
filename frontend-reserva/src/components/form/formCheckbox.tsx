import { useId } from 'react';


interface FormInputProps{
    label: string;
    name: string;
    error: string;
    [key: string]: any;
}

export function FormCheckbox({type, label, name, error, ...props}: FormInputProps){
    const id = useId();

    return <div className='grid w-full'>
        <div className='flex gap-2 items-center'>            
            <label htmlFor={id} className='font-semibold cursor-pointer'>{label}</label>
            <input id={id} type='checkbox' className='outline-none px-2 py-1 scale-110  accent-primary bg-primary'  name={name} {...props} />
        </div>
        <span className='text-sm font-light text-red-500 pl-1'>{error}</span>
    </div>
}