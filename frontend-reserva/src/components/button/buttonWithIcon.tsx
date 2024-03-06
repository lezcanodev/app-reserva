import { ReactNode } from 'react';


interface ButtonWithIconProps{
    text: string;
    icon: ReactNode;
    [key: string]: any;
}

export function ButtonWithIcon({text, icon, ...props}: ButtonWithIconProps){
    return             <button className='flex items-center gap-2 border opacity-70 bg-primary text-primary-contrast px-2 py-1 rounded-xs
    hover:scale-95 hover:opacity-100 transition-transform' {...props}> 
        <div>
            {icon}
        </div>    
        <div>
            {text}
        </div>
    </button>
}