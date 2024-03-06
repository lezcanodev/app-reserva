import BasePage from '../basePage';
import { Persona, createPersona, deletePersona, editPersona, findAllPersonas } from '../../api/persona.api';
import { useApi } from '../../hooks/useApi';
import { IoPersonAddOutline } from "react-icons/io5";
import Modal from '../../components/modal/modal';
import { useModal } from '../../hooks/useModal';
import { FormCreatePersona } from './formCreatePersona';
import { ButtonWithIcon } from '../../components/button/buttonWithIcon';
import { TablePersonas } from './tablePersonas';


export default function PersonaPage(){
    const [personas, loadingFindAllPersonas, setPersonas, refreshPersonas] = useApi<Persona[]>(findAllPersonas, []);
    const [showCreate, showCreateModal, hiddeCreateModal] = useModal();
    
    const handleCreatePersona = async (newPersona: any) => {
        const res = await createPersona(newPersona);
        
        if(res.statusCode === 201){
            refreshPersonas();
            return null;
        }

        return res;
    }
    
    const handleEditPersona = async (updatePersona: any, personaId: number) => {
        const res = await editPersona(updatePersona, personaId);
      
        if(res.statusCode === 200){
            const updatedPersonas = personas.map(p => p.id === personaId ? {id: personaId, ...updatePersona} : p );
            setPersonas(updatedPersonas);
            return null;
        }

        return res;
    }

    const handleDeletePersona = async (id: number) => {
        const res = await deletePersona(id);
        if(res.statusCode === 204){
            const updatedPersonas = personas.filter(persona => persona.id != id )
            setPersonas(updatedPersonas);
        }
    }



    return <BasePage title='Personas'>
        <div className='w-full px-2 flex justify-end mb-5'>
            <ButtonWithIcon 
                icon={<IoPersonAddOutline/>}
                text='Registrar'
                onClick={showCreateModal}
            />   
        </div>
        <div className='max-w-[900px] mx-auto'>
            <TablePersonas
                loading={loadingFindAllPersonas}
                personas={personas}
                handleRemovePersona={handleDeletePersona}
                handleEditPersona={handleEditPersona}
            />
        </div>
        

       <Modal 
            title='Registrar Persona'
            show={showCreate}
            hiddeModal={hiddeCreateModal}
            maxWidth={400}>
            <FormCreatePersona handleCreatePersona={handleCreatePersona}/>
       </Modal>

    </BasePage>
}