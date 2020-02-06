
import * as vectors from '../docs/vectors.json'
import { CanvasRenderingContext2D, Image } from 'canvas'
import { VectorsName } from '../docs/enums'

export default function drawImage(
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