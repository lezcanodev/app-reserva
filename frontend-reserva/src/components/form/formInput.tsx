
interface FormInputProps{
    type: string;
    label: string;
    name: string;
    error?: string;
    [key: string]: any;
}

export function FormInput({type, label, name, error, ...props}: FormInputProps){
    return <div className='grid w-full'>
        <label className='font-semibold'>{label}</label>
        <input type={type} className='outline-none px-2 py-1'  name={name} {...props}/>
        <span className='text-sm font-light text-red-500 pl-1'>{error}</span>
    </div>
}

