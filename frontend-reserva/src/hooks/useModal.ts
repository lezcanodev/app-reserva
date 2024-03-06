import { useState } from 'react';



export function useModal(): [boolean, () => void, () => void]{
    const [show, setShow] = useState(false);

    function showModal(){
        setShow(true);
    }

    function hiddeModal(){
        setShow(false);
    }

    return [show, showModal, hiddeModal];
}