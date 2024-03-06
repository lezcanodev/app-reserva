import BasePage from '../basePage';
import { useApi } from '../../hooks/useApi';
import Modal from '../../components/modal/modal';
import { useModal } from '../../hooks/useModal';
import { FormCreateHabitacion } from './formCreateHabitacion';
import { ButtonWithIcon } from '../../components/button/buttonWithIcon';
import { TableHabitaciones } from './tableHabitacion';
import { Habitacion, createHabitacion, deleteHabitacion, editHabitacion, findAllPHabitacion } from '../../api/habitacion.api';
import { LuDoorOpen } from "react-icons/lu";


export default function HabitacionPage(){
    const [habitaciones, loadingFindAllHabitaciones, setHabitaciones, refreshHabitaciones] = useApi<Habitacion[]>(findAllPHabitacion, []);
    const [showCreate, showCreateModal, hiddeCreateModal] = useModal();
    
    const handleCreateHabitacion = async (newHabitacion: any) => {
        const res = await createHabitacion(newHabitacion);
        
        if(res.statusCode === 201){
            refreshHabitaciones();
            return null;
        }

        return res;
    }
    
    const handleEditHabitacion = async (updateHabitacion: any, habitacionId: number) => {
        const res = await editHabitacion(updateHabitacion, habitacionId);
      
        if(res.statusCode === 200){
            const updatedHabitaciones = habitaciones.map(p => p.id === habitacionId ? {id: habitacionId, ...updateHabitacion} : p );
            setHabitaciones(updatedHabitaciones);
            return null;
        }

        return res;
    }

    const handleDeleteHabitacion = async (id: number) => {
        const res = await deleteHabitacion(id);
        if(res.statusCode === 204){
            const updatedHabitacion = habitaciones.filter(habitacion => habitacion.id != id )
            setHabitaciones(updatedHabitacion);
        }
    }



    return <BasePage title='Habitaciones'>
        <div className='w-full px-2 flex justify-end mb-5'>
            <ButtonWithIcon 
                icon={<LuDoorOpen/>}
                text='Registrar'
                onClick={showCreateModal}
            />   
        </div>
        <div>
            <TableHabitaciones
                loading={loadingFindAllHabitaciones}
                habitaciones={habitaciones}
                handleRemoveHabitacion={handleDeleteHabitacion}
                handleEditHabitacion={handleEditHabitacion}
            />
        </div>
        

       <Modal 
            title='Registrar Habitacion'
            show={showCreate}
            hiddeModal={hiddeCreateModal}
            maxWidth={400}>
            <FormCreateHabitacion handleCreateHabitacion={handleCreateHabitacion}/>
       </Modal>

    </BasePage>
}