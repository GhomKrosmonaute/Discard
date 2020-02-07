
export function map(n:number, start1:number, stop1:number, start2:number, stop2:number):number {
    return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2
}

export function percent(n:number, max:number):number {
    return map(n,0,max,0,100)
}