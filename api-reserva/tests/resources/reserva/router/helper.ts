

export function geneareValidFechasReserva(){
    const fechaEntrada = new Date();
    fechaEntrada.setUTCDate(fechaEntrada.getUTCDate()+1);
    const fechaSalida = new Date();
    fechaSalida.setUTCDate(fechaSalida.getUTCDate()+2);

    return [fechaEntrada, fechaSalida];
}