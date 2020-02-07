
import vectors from '../config/vectors.js'
import { CanvasRenderingContext2D, Image } from 'canvas'
import { VectorName } from '../config/enums'
import { Vector } from '../config/interfaces'

export function drawImage(
    ctx:CanvasRenderingContext2D, 
    image:Image, 
    vectorName:VectorName = VectorName.Card
){
    const vector:Vector = vectors.find( v => v.name === vectorName )
    ctx.drawImage( image, 
        vector.x, 
        vector.y, 
        vector.width, 
        vector.height
    )
}

export function drawText(
    ctx:CanvasRenderingContext2D,
    text:string,
    vectorName:VectorName,
    color:string = '#7289DA'
){
    const vector:Vector = vectors.find( v => v.name === vectorName )
    ctx.textBaseline = 'top'
    ctx.font = `normal ${vector.height}px Arial`
    ctx.fillStyle = color
    ctx.fillText( text,
        vector.x,
        vector.y, 
        vector.width, 
    )
}