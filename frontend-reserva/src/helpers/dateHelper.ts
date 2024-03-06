import { numberTwoDigits } from './numberHelper';



export function parseInputDateWithTimeToISO(inputDateValue: string, inputTimeValue: string){
    let result = ''; // //YYYY-MM-DDTHH:mm:ss.sssZ
    if(typeof inputTimeValue === 'undefined' || inputTimeValue.trim().length === 0) inputTimeValue ='00:00';
    result += `${inputDateValue}T${inputTimeValue}:00Z`;
    return result;
}

export function parseStringToDate(dateISO: string, includeTime:boolean = true){
    const d = new Date(dateISO);
    const day = numberTwoDigits(d.getUTCDate());
    const month = numberTwoDigits(d.getUTCMonth()+1);
    const year = d.getUTCFullYear();
    const hour = numberTwoDigits(d.getUTCHours());
    const minute = numberTwoDigits(d.getUTCMinutes());
    
    const time = includeTime ? ` ${hour}:${minute}` : '';

    return `${day}/${month}/${year}${time}`;
}

export function parseDateFromDateISO(dateISO: string){
    const d = new Date(dateISO);
    const day = numberTwoDigits(d.getUTCDate());
    const month = numberTwoDigits(d.getUTCMonth()+1);
    const year = d.getUTCFullYear();

    return `${year}-${month}-${day}`;
}

export function parseTimeFromDateISO(dateISO: string){
    const d = new Date(dateISO);
    const hour = numberTwoDigits(d.getUTCHours());
    const minute = numberTwoDigits(d.getUTCMinutes());

    return `${hour}:${minute}`;
}