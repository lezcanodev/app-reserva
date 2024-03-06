import {  ReactNode } from 'react';


interface BasePageProps{
    title: string;
    children?: ReactNode
}

export default function BasePage({title, children}: BasePageProps){
    return <section className='w-full max-w-[900px] mx-auto'>
        <div className='pt-8 py-3 px-3'>
            <h3 className='text-2xl px-1 pb-1 font-bold text-primary border-b-[2px] border-primary max-w-[70px]'>{title}</h3>
        </div>
        <div className='px-10 mt-5 mb-10'>
            {children}
        </div>
    </section> 
}