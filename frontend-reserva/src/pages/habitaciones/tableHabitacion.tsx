import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Table } from '../../components/table/table';
import Modal from '../../components/modal/modal';
import { FormEditHabitacion } from './formEditHabitacion';
import { useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { Habitacion } from '../../api/habitacion.api';
import { FaRegTimesCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";


interface TableHabitacionesProps{
    habitaciones: Habitacion[],
    loading: boolean; 
    handleRemoveHabitacion: any;
    handleEditHabitacion: any;
}

export function TableHabitaciones({habitaciones, loading, handleRemoveHabitacion, handleEditHabitacion}: TableHabitacionesProps){
    const [editHabitacion, setEditHabitacion] = useState<Habitacion>()
    const [showedEdit, showEditModal, hiddeEditModal] = useModal();

    return (<>
                <div className='text-end px-5'>
                    <span className='font-semibold text-xs'>resultados: {habitaciones.length}</span>
                </div>
                <Table columnsName={['Id','Piso','Numero','Cant. Camas','Television','Frigobar', '']}>
                    
                    {loading ? (
                        <Table.Row>
                            <Table.Data colSpan={7}> Cargando... </Table.Data>
                        </Table.Row>
                    ) : (<>
                        {!loading && habitaciones.map(habitacion => (
                            <Table.Row key={`persona${habitacion.id}`}>
                                <Table.Data> {habitacion.id} </Table.Data>
                                <Table.Data> {habitacion.piso} </Table.Data>
                                <Table.Data> {habitacion.numero} </Table.Data>
                                <Table.Data> {habitacion.cantCamas} </Table.Data>
                                <Table.Data> 
                                    <div className='flex justify-center text-lg'>
                                        {!habitacion.tieneTelevision ? <FaRegTimesCircle className='text-red-500'/> : <FaRegCheckCircle className='text-green-500' />} 
                                    </div>
                                </Table.Data>
                                <Table.Data> 
                                    <div className='flex justify-center text-lg'>
                                        {!habitacion.tieneFrigobar ? <FaRegTimesCircle className='text-red-500'/> : <FaRegCheckCircle className='text-green-500'/>} 
                                    </div>
                                </Table.Data>
                                <Table.Data> 
                                    <div className='flex  items-center justify-center text-primary'>
                                        <button className='w-full hover:scale-125 transition-transform'
                                            onClick={() => { showEditModal(); setEditHabitacion(habitacion); }}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button className='w-full hover:scale-125 transition-transform'
                                        onClick={async () => await handleRemoveHabitacion(habitacion.id)}>
                                            <FaTrashAlt/>
                                        </button>
                                    </div>
                                </Table.Data>
                            </Table.Row>)
                        )}
                        {habitaciones.length === 0 ? (
                        <Table.Row>
                            <Table.Data colSpan={7}> No hay habitaciones registradas </Table.Data>
                        </Table.Row>
                        ) : (<></>)}
                    </>)}
                    
                </Table>

                <Modal 
                    title='Editar Persona'
                    show={showedEdit}
                    hiddeModal={hiddeEditModal}
                    maxWidth={400}>
                    
                    <FormEditHabitacion
                        habitacion={editHabitacion!}
                        handleEditHabitacion={handleEditHabitacion}
                    />
                </Modal>
    </>);
}