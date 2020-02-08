
export function xprod(n:number, start1:number, stop1:number, start2:number, stop2:number):number {
    return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2
}

export function percent(n:number, max:number):number {
    return xprod(n,0,max,0,100)
}

export function vround(n:number, length:number = 2):number {
    return Number(n.toFixed(length))
}