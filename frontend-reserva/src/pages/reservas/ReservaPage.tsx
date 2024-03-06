import BasePage from '../basePage';
import { useApi } from '../../hooks/useApi';
import Modal from '../../components/modal/modal';
import { useModal } from '../../hooks/useModal';
import { FormCreateReserva } from './formCreateReserva';
import { ButtonWithIcon } from '../../components/button/buttonWithIcon';
import { TableReservas } from './tableReservas';
import { LuBookPlus } from "react-icons/lu";
import { Reserva, createReserva, deleteReserva, editReserva, findAllReserva } from '../../api/reserva.api';


export default function ReservaPage(){
    const [reservas, loadingFindAllPersonas, setReservas, refreshReservas] = useApi<Reserva[]>(findAllReserva, []);
    const [showCreate, showCreateModal, hiddeCreateModal] = useModal();
    
    const handleCreateReserva = async (newReserva: any) => {
        const res = await createReserva(newReserva);
        
        if(res.statusCode === 201){
            refreshReservas();
            return null;
        }

        return res;
    }
    
    const handleEditReserva = async (updateReserva: any, reservaId: number) => {
        const res = await editReserva(updateReserva, reservaId);
      
        if(res.statusCode === 200){
            refreshReservas();
            return null;
        }

        return res;
    }

    const handleDeleteReserva = async (id: number) => {
        const res = await deleteReserva(id);
        if(res.statusCode === 204){
            const updatedReservas = reservas.filter(reserva => reserva.id != id )
            setReservas(updatedReservas);
        }
    }

    return <BasePage title='Reservas'>

        <div className='w-full px-2 flex justify-end mb-5'>
            <ButtonWithIcon 
                icon={<LuBookPlus/>}
                text='Registrar'
                onClick={showCreateModal}
            />   
        </div>
        <div>
            <TableReservas
                loading={loadingFindAllPersonas}
                reservas={reservas}
                handleRemoveReserva={handleDeleteReserva}
                handleEditReserva={handleEditReserva}
            />
        </div>
       
        

       <Modal 
            title='Registrar Reserva'
            show={showCreate}
            hiddeModal={hiddeCreateModal}
            maxWidth={400}>
            <FormCreateReserva handleCreateReserva={handleCreateReserva}/>
       </Modal>

    </BasePage>
}