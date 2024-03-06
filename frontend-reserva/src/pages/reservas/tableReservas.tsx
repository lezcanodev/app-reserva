import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Table } from '../../components/table/table';
import Modal from '../../components/modal/modal';
import { FormEditReserva } from './formEditReserva';
import { useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { Reserva } from '../../api/reserva.api';
import { parseStringToDate } from '../../helpers/dateHelper';
import { numberWithPoint } from '../../helpers/numberHelper';
import { Persona, findAllPersonas } from '../../api/persona.api';
import { useApi } from '../../hooks/useApi';


interface TablePersonasProps{
    reservas: Reserva[],
    loading: boolean; 
    handleRemoveReserva: any;
    handleEditReserva: any;
}

export function TableReservas({reservas, loading, handleRemoveReserva, handleEditReserva}: TablePersonasProps){
    const [editReserva, setEditReserva] = useState<Reserva>()
    const [showedEdit, showEditModal, hiddeEditModal] = useModal();
    const [personas, loadingPersonas] = useApi<Persona[]>(findAllPersonas, []);

    return (<>
                <div className='text-end px-5'>
                    <span className='font-semibold text-xs'>resultados: {reservas.length}</span>
                </div>
                <Table columnsName={['Id','Persona', 'Habitacion (piso-nro)','fecha reserva','fecha entrada/salida', 'costo', '']}>
                    
                    {loading ? (
                        <Table.Row>
                            <Table.Data colSpan={7}> Cargando... </Table.Data>
                        </Table.Row>
                    ) : (<>
                        {!loading && reservas.map(reserva => (
                            <Table.Row key={`reserva${reserva.id}`}>
                                <Table.Data> {reserva.id} </Table.Data>
                                <Table.Data> {reserva.persona?.nombre+' '+reserva.persona?.apellido} </Table.Data>
                                <Table.Data> {'piso: '+reserva.habitacion?.piso+' nro.:'+reserva.habitacion?.numero} </Table.Data>
                                <Table.Data> {parseStringToDate(reserva.fechaReserva)} </Table.Data>
                                <Table.Data> 
                                    <div>
                                        {parseStringToDate(reserva.fechaEntrada)}
                                    </div>
                                    <div className='text-xs'>
                                        hasta
                                    </div>
                                    <div>
                                        {parseStringToDate(reserva.fechaSalida)}
                                    </div>
                                </Table.Data>
                                <Table.Data> {numberWithPoint(reserva.montoReserva)} </Table.Data>
                                <Table.Data> 
                                    <div className='flex gap-1 items-center justify-center text-primary px-3'>
                                        <button className='w-full hover:scale-125 transition-transform'
                                            onClick={() => { showEditModal();  setEditReserva(reserva); }}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button className='w-full hover:scale-125 transition-transform'
                                        onClick={async () => await handleRemoveReserva(reserva.id)}>
                                            <FaTrashAlt/>
                                        </button>
                                    </div>
                                </Table.Data>
                            </Table.Row>)
                        )}
                        {reservas.length === 0 ? (
                        <Table.Row>
                            <Table.Data colSpan={7}> No hay personas registradas </Table.Data>
                        </Table.Row>
                        ) : (<></>)}
                    </>)}
                    
                </Table>

                <Modal 
                    title='Editar Reserva'
                    show={showedEdit}
                    hiddeModal={hiddeEditModal}
                    maxWidth={400}>
                    
                    <FormEditReserva
                        reserva={editReserva!}
                        handleEditReserva={handleEditReserva}
                        personas={personas}
                        loadingPersonas={loadingPersonas}
                    />
                </Modal>
    </>);
}