
import vectors from '../config/vectors.js'
import { CanvasRenderingContext2D, Image } from 'canvas'
import { VectorName } from '../config/types'
import { Vector } from '../config/interfaces'
import { DiscordColor } from '../config/enums.js'

export function drawImage(
    ctx:CanvasRenderingContext2D, 
    image:Image, 
    vectorName:VectorName = 'card',
    rounded:boolean = false
){
    const vector:Vector = vectors.find( v => v.name === vectorName )
    if(rounded){
        ctx.save()
        ctx.beginPath()
        ctx.arc(
            vector.x + vector.width / 2,
            vector.y + vector.height / 2, 
            ((vector.width + vector.height) / 2) / 2,
            0, Math.PI*2
        )
        ctx.closePath()
        ctx.clip()
    }
    ctx.drawImage( image, 
        vector.x, 
        vector.y, 
        vector.width, 
        vector.height
    )
    if(rounded)
    ctx.restore()
}

export function drawText(
    ctx:CanvasRenderingContext2D,
    text:string,
    vectorName:VectorName,
    color:string = DiscordColor.Blue
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