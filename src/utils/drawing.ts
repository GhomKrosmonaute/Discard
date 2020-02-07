
import * as vectors from '../config/vectors.json'
import { CanvasRenderingContext2D, Image } from 'canvas'
import { VectorsName } from '../config/enums'

export function drawImage(
    ctx:CanvasRenderingContext2D, 
    image:Image, 
    vectorsName:VectorsName = VectorsName.Card
){
    ctx.drawImage( image, 
        vectors[vectorsName].x, 
        vectors[vectorsName].y, 
        vectors[vectorsName].width, 
        vectors[vectorsName].height
    )
}

export function drawText(
    ctx:CanvasRenderingContext2D,
    text:string,
    vectorsName:VectorsName,
    color:string = '#7289DA'
){
    ctx.textBaseline = 'top'
    ctx.font = `normal ${vectors[vectorsName].height}px Arial`
    ctx.fillStyle = color
    ctx.fillText( text,
        vectors[vectorsName].x, 
        vectors[vectorsName].y, 
        vectors[vectorsName].width
    )
}