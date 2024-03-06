import { ReactNode } from 'react'


interface NavProps{
    children: ReactNode
}

export default function Nav({children}: NavProps){
    return  <nav className=' rounded-r-[80px] max-w-[190px] bg-primary text-primary-contrast h-lvh flex flex-col gap-2 items-center justify-center'>
        {children}
    </nav>
}