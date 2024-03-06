import { ReactNode, forwardRef } from 'react';




export function Form({children, ...props}: {children: ReactNode, [prop: string]: any}){
    return <form className='w-full grid gap-5 text-secondary overflow-hidden' {...props}>
        {children}
    </form>
}

export default forwardRef(function FormWithRef({children, ...props}: {children: ReactNode, [prop: string]: any}, ref: any){
    return <form className='w-full grid gap-5 text-secondary overflow-hidden' {...props} ref={ref}>
        {children}
    </form>
})