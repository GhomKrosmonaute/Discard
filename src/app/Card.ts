
const Canvas = require('canvas')
import {Canvas as CanvasES6} from 'canvas'
import Client from './Client'
import { Attachment } from 'discord.js'
import drawImage from '../utils/drawImage'
import { VectorsName } from '../docs/enums'
import { CardData, DiscardGuildMember } from '../docs/interfaces'

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

    public get enmap(){ return this.discard.enmap }

    private _getProp( name:string ){ return this.enmap.get( this.member.guild.id + '-' + this.member.id, name ) }
    private _setProp( name:string, value:any ){ this.enmap.set( this.member.guild.id + '-' + this.member.id, name, value ) }

    public get boss(){ return this._getProp('boss') }

    public get elo(){ return this._getProp('elo') }
    public set elo( elo ){ this._setProp( 'elo', elo ) }

    public get energy(){ return this._getProp('energy') }
    public set energy( energy ){ this._setProp( 'energy', energy ) }

    public get health(){ return this._getProp('health') }
    public get speed(){ return this._getProp('speed') }
    public get attack(){ return this._getProp('attack') }
    public get moves(){ return this._getProp('moves') }

    public get deck(){ return this.discard.getDeck( this.member.guild ) }
    public get player(){ return this.discard.getPlayer( this.member.user ) }

    public get theme(){ return this.discard.themes[this.discard.getPlayer( this.member.user ).theme] }
    public set theme( theme ){ this.discard.getPlayer( this.member.user ).theme = theme }

    public async getCanvas():Promise<CanvasES6>|never {

        await this.discard.loaded

        const canvas = Canvas.createCanvas( 400, 600 )
        const ctx = canvas.getContext('2d')

        drawImage( ctx, this.theme.background )
        drawImage( ctx, await this.player.getAvatar(), VectorsName.Avatar )
        drawImage( ctx, this.theme.middle )
        drawImage( ctx, this.theme.foreground )

        return canvas
    }

    public async getAttachment():Promise<Attachment> {
        return new Attachment( (await this.getCanvas()).toBuffer(), `card.png` )
    }

}