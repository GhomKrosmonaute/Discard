
const Canvas = require('canvas')
import {Canvas as CanvasES6} from 'canvas'
import Client from './Client'
import { Attachment } from 'discord.js'
import { drawImage, drawText } from '../utils/drawing'
import { VectorsName } from '../config/enums'
import { CardData, DiscardGuildMember, Theme } from '../config/interfaces'
import Deck from './Deck'
import Player from './Player'

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
        
        member.card = this

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

    public get theme():Theme { return this.discard.themes[this.discard.getPlayer( this.member.user ).theme] }
    public setTheme( theme:string ){ this.discard.getPlayer( this.member.user ).theme = theme }

    public async getCanvas():Promise<CanvasES6>|never {

        await this.discard.loaded

        const canvas = Canvas.createCanvas( 400, 600 )
        const ctx = canvas.getContext('2d')

        drawImage( ctx, this.theme.background )
        drawImage( ctx, await this.player.getAvatar(), VectorsName.Avatar )
        drawImage( ctx, await this.deck.getIcon(), VectorsName.GuildIcon )
        drawImage( ctx, this.theme.middle )
        drawText( ctx, this.member.guild.name, VectorsName.GuildName )
        drawText( ctx, 'Card: ' + this.member.displayName, VectorsName.InfoTop, this.member.displayHexColor )
        drawText( ctx, 'Player: ' + this.member.user.username, VectorsName.InfoBottom )
        drawText( ctx, `Bla bla bla\nBliblibli\nEt tout et tout...\nBite`, VectorsName.Body, '#ffffff' )
        drawImage( ctx, this.theme.foreground )

        return canvas
    }

    public async getAttachment():Promise<Attachment> {
        return new Attachment( (await this.getCanvas()).toBuffer(), `card.png` )
    }

}