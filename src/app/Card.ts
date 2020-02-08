
const Canvas = require('canvas')
import {Canvas as CanvasES6} from 'canvas'
import Client from './Client'
import { Attachment } from 'discord.js'
import { DiscordColor } from '../config/enums'
import { drawImage, drawText } from '../utils/drawing'
import { VectorName, ThemeName } from '../config/types'
import { CardData, DiscardGuildMember, Theme } from '../config/interfaces'
import Deck from './Deck'
import Player from './Player'
import vectors from '../config/vectors'

export default class Card {

    public discard:Client
    public member:DiscardGuildMember

    constructor( discard:Client, member:DiscardGuildMember ){

        this.discard = discard
        this.member = member

        const isBoss:boolean = member.id === member.guild.owner.id

        const data:CardData = {
            elo: 1000,
            energy: 10,
            boss: isBoss,
            health: 2,
            speed: 2,
            attack: 2,
            moves: [],
            power: Math.ceil( Math.random() * 5 ) + (isBoss ? 10 : 0)
        }
        for(let i=0; i<data.power; i++){
            const rdm = Math.random()
            if(rdm < 1/3)       data.health ++
            else if(rdm < 2/3)  data.speed ++
            else                data.attack ++
        }

        this.enmap.ensure( member.guild.id + '-' + member.id, data)

    }

    public get data():CardData { return this.enmap.get( this.member.guild.id + '-' + this.member.id ) }

    public get enmap():any { return this.discard.enmap }

    private _getProp( name:string ):any { return this.enmap.get( this.member.guild.id + '-' + this.member.id, name ) }
    private _setProp( name:string, value:any ){ this.enmap.set( this.member.guild.id + '-' + this.member.id, name, value ) }

    public get boss():boolean { return this._getProp('boss') }

    public get elo():number { return this._getProp('elo') }
    public set elo( elo:number ){ this._setProp( 'elo', elo ) }

    public get energy():number { return this._getProp('energy') }
    public set energy( energy:number ){ this._setProp( 'energy', energy ) }

    public get health():number { return this._getProp('health') }
    public get speed():number { return this._getProp('speed') }
    public get attack():number { return this._getProp('attack') }
    public get moves():number { return this._getProp('moves') }

    public get deck():Deck { return this.discard.getDeck( this.member.guild ) }
    public get player():Player { return this.discard.getPlayer( this.member.user ) }

    public getTheme():Theme { return this.player.getTheme() }
    public setTheme( theme:ThemeName ):void { this.player.setTheme(theme) }

    public async getCanvas():Promise<CanvasES6>|never {

        await this.discard.loaded

        const weight:number = 3

        const theme = this.getTheme()
        const cardVector = vectors.find( v => v.name === 'card' )

        const canvas:CanvasES6 = Canvas.createCanvas( cardVector.width, cardVector.height )
        const ctx = canvas.getContext('2d')

        // this.member.displayHexColor

        drawImage( ctx, theme.background )
        drawImage( ctx, await this.player.getAvatar(), 'avatar' )
        drawImage( ctx, await this.deck.getIcon(), 'guildIcon', true )
        drawImage( ctx, theme.middle )
        drawText( ctx, this.member.guild.name, 'guildName' )
        drawText( ctx, 'Player: ' + this.member.user.username, 'infoTop' )
        drawText( ctx, 'Card: ' + this.member.displayName, 'infoBottom' )
        drawText( ctx, `Zone ou il y aura les compétences.`, 'body', theme.config.textColor )
        drawImage( ctx, theme.foreground )

        const cardeCanvas:CanvasES6 = Canvas.createCanvas( 
            cardVector.width + (weight * 2), 
            cardVector.height + (weight * 2)
        )
        const cadreCtx = cardeCanvas.getContext('2d')

        cadreCtx.fillStyle = DiscordColor.Blue
        cadreCtx.fillRect(
            cardVector.x,
            cardVector.y, 
            cardVector.width + (weight * 2), 
            cardVector.height + (weight * 2) 
        )
        cadreCtx.drawImage( canvas, weight, weight )

        return cardeCanvas
    }

    public async getAttachment():Promise<Attachment> {
        return new Attachment( (await this.getCanvas()).toBuffer(), `card.png` )
    }

}