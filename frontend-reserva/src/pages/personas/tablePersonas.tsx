import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Persona } from '../../api/persona.api';
import { Table } from '../../components/table/table';
import { numberWithPoint } from '../../helpers/numberHelper';
import Modal from '../../components/modal/modal';
import { FormEditPersona } from './formEditPersona';
import { useState } from 'react';
import { useModal } from '../../hooks/useModal';


interface TablePersonasProps{
    personas: Persona[],
    loading: boolean; 
    handleRemovePersona: any;
    handleEditPersona: any;
}

export function TablePersonas({personas, loading, handleRemovePersona,handleEditPersona}: TablePersonasProps){
    const [editPersona, setEditPersona] = useState<Persona>()
    const [showedEdit, showEditModal, hiddeEditModal] = useModal();

    return (<>
                <div className='text-end px-5'>
                    <span className='font-semibold text-xs'>resultados: {personas.length}</span>
                </div>
                <Table columnsName={['Id','Nro. Doc.','Nombre','Apellido','Telefono','Correo', '']}>
                    
                    {loading ? (
                        <Table.Row>
                            <Table.Data colSpan={7}> Cargando... </Table.Data>
                        </Table.Row>
                    ) : (<>
                        {!loading && personas.map(persona => (
                            <Table.Row key={`persona${persona.id}`}>
                                <Table.Data> {persona.id} </Table.Data>
                                <Table.Data> {numberWithPoint(persona.nroDocumento)} </Table.Data>
                                <Table.Data> {persona.nombre} </Table.Data>
                                <Table.Data> {persona.apellido} </Table.Data>
                                <Table.Data> {persona.telefono} </Table.Data>
                                <Table.Data> {persona.correo} </Table.Data>
                                <Table.Data> 
                                    <div className='flex  items-center justify-center text-primary'>
                                        <button className='w-full hover:scale-125 transition-transform'
                                            onClick={() => { showEditModal();  setEditPersona(persona); }}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button className='w-full hover:scale-125 transition-transform'
                                        onClick={async () => await handleRemovePersona(persona.id)}>
                                            <FaTrashAlt/>
                                        </button>
                                    </div>
                                </Table.Data>
                            </Table.Row>)
                        )}
                        {personas.length === 0 ? (
                        <Table.Row>
                            <Table.Data colSpan={7}> No hay personas registradas </Table.Data>
                        </Table.Row>
                        ) : (<></>)}
                    </>)}
                    
                </Table>

                <Modal 
                    title='Editar Persona'
                    show={showedEdit}
                    hiddeModal={hiddeEditModal}
                    maxWidth={400}>
                    
                    <FormEditPersona
                        persona={editPersona!}
                        handleEditPersona={handleEditPersona}
                    />
                </Modal>
    </>);
}