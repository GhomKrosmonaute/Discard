
const Canvas = require('canvas')
import {Canvas as CanvasES6, Image } from 'canvas'
import Client from './Client'
import { DiscardGuild, DeckData } from '../config/interfaces'
import { Snowflake, Collection, Attachment } from 'discord.js'
import Card from './Card'

export default class Deck {

    private icon:Image
    public discard:Client
    public guild:DiscardGuild

    constructor( discard:Client, guild:DiscardGuild ){

        this.discard = discard
        this.guild = guild

        const data:DeckData = {
            elo: 1000,
            energy: 10
        }

        this.enmap.ensure( guild.id, data )

    }

    public get data():DeckData { return this.enmap.get( this.guild.id ) }

    public get enmap():any { return this.discard.enmap }

    public get elo():number { return this.enmap.get( this.guild.id, 'elo' ) }
    public set elo( elo:number ){ this.enmap.set( this.guild.id, 'elo', elo ) }

    public get cards():Collection<string,Card> {
        const cards = (new Collection() as Collection<string,Card>)
        this.guild.members.forEach( member => {
            cards.set( member.id, this.discard.getCard(member) )
        })
        return cards
    }

    public async getIcon():Promise<Image> {
        if(!this.icon)
        this.icon = await Canvas.loadImage(this.guild.iconURL)
        return this.icon
    }

    public forEach( callback:any ):void { this.cards.forEach(callback) }
    public filter( callback:any ):Collection<string,Card> { return this.cards.filter(callback) }
    public map( callback:any ):Card[] { return this.cards.map(callback) }

    public async getCanvas():Promise<CanvasES6>|never {

        await this.discard.loaded

        const canvas = Canvas.createCanvas( 400, 600 )
        const ctx = canvas.getContext('2d')

        // drawing

        return canvas
    }

    public async getAttachment():Promise<Attachment> {
        return new Attachment( (await this.getCanvas()).toBuffer(), `deck.png` )
    }

}