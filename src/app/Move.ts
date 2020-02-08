
const Canvas = require('canvas')
import {Canvas as CanvasES6, Image } from 'canvas'
import Client from './Client'
import { Tag, Target, Buffable } from '../config/types'
import { MoveOptions } from '../config/interfaces'
import Fight from './Fight'
import { Attachment } from 'discord.js'

export default class Move implements MoveOptions {

    public name: string
    public tags: Tag[]
    public targets: Target[]
    public nitro: number
    public buff?: [Buffable, number][]
    public debuff?: Buffable[]
    public damage?: number
    public fight:Fight
    public canvas:CanvasES6

    constructor( fight:Fight, options:MoveOptions ){
        
        this.fight = fight
        Object.assign( this, options )

    }

    public get discard():Client { return this.fight.discard }
    public get enmap():any { return this.discard.enmap }

    public async getCanvas():Promise<CanvasES6>|never {

        if(this.canvas) 
        return this.canvas

        await this.discard.loaded

        const canvas = Canvas.createCanvas( 400, 600 )
        const ctx = canvas.getContext('2d')

        // drawing

        return canvas
    }

    public async getAttachment():Promise<Attachment> {
        return new Attachment( (await this.getCanvas()).toBuffer(), `move.png` )
    }

}