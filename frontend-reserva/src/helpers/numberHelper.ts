

export function numberWithPoint(n: number): string{
    let result: string[] = [];
    const digits = n.toString().split('.')[0].split('').reverse(); 

    digits.forEach((x,index) =>{
        result.push(x);
        if((index+1)%3==0 && index+1 !== digits.length) result.push('.');
    })
    return result.reverse().join('');
}

export function numberTwoDigits(n: number){
    if(n < 10) return '0'+n;
    return n;
}