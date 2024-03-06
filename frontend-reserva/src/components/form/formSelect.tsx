import { ReactNode } from 'react';


interface FormInputProps{
    type: string;
    label: string;
    name: string;
    error: string;
    children: ReactNode;
    [key: string]: any;
}

FormSelect.Option = ({title, value, selected}: {title: string; value:any; selected?: boolean}) => {
    return  (selected ? (
        <option value={value} className='py-2' selected>{title}</option>
    ) : (
        <option value={value} className='py-2'>{title}</option>
    ));   
}

export function FormSelect({type, label, name, error, children, ...props}: FormInputProps){
    
    return <div className='grid w-full'>
        <label className='font-semibold'>{label}</label>
        <select className='outline-none px-2 py-1' defaultValue={7}  name={name} {...props}>
            {children}    
        </select>
        <span className='text-sm font-light text-red-500 pl-1'>{error}</span>
    </div>
}