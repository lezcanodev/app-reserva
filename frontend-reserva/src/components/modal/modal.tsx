import  { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { IoCloseCircleOutline } from "react-icons/io5";

interface ModalProps{
    children: ReactNode;
    maxWidth?: number;
    title: string;
    show: boolean;
    hiddeModal: () => void
}

export default function Modal({children, title, hiddeModal, show, maxWidth}: ModalProps){

    return createPortal(<>{show &&  (
        <div onClick={hiddeModal} className='backdrop-blur-sm px-2 fixed top-0 left-0 w-full h-full bg-black/20 flex justify-center items-start pt-8 pb-5 rounded-md overflow-auto'>
            <div onClick={(e) => e.stopPropagation() } className={`bg-slate-200  w-full rounded-sm`} style={{maxWidth: `${maxWidth}px`}}>
                <div className='bg-primary text-primary-contrast flex justify-between items-center pl-3 pr-2 py-2'>
                    <div>
                        {title}
                    </div>
                    <div className='text-xl cursor-pointer' onClick={hiddeModal}>
                        <IoCloseCircleOutline/>
                    </div>
                </div>
                <div className='px-3 py-5'>
                    {children}
                </div>
            </div>
        </div>
    )}</>, document.getElementById('modal')!)
} 