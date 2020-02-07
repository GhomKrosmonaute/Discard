
import Client from './Client'
import { DiscardGuild, DeckData } from '../docs/interfaces'
import { Snowflake, Collection } from 'discord.js'
import Card from './Card'
import { Image } from 'canvas'

const Canvas = require('canvas')

export default class Deck {

    private icon:Image
    public discard:Client
    public guild:DiscardGuild

    constructor( discard:Client, guild:DiscardGuild ){

        this.discard = discard
        this.guild = guild

        this.enmap.ensure( guild.id, {
            elo: 1000,
            energy: 10
        })

        guild.deck = this

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

}