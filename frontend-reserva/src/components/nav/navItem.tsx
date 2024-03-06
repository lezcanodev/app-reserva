import { ReactNode } from 'react';


interface NavItemProps{
    name: string;
    icon: ReactNode;
    [key: string]: any
}

export default function NavItem({name, icon, ...props}: NavItemProps){
    return(
        <button 
        className='w-full flex items-center gap-2  p-3  hover:translate-x-2 transition-transform '   {...props} >
            <div>
                {icon}
            </div>
            <div>
                {name}
            </div>
        </button>
    )
}