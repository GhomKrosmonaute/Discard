
import Client from './Client'
import { Image } from 'canvas'
import { DiscardUser, PlayerData } from '../config/interfaces'
import Card from './Card'

const Canvas = require('canvas')

export default class Player {

    private avatar:Image
    public discard:Client
    public user:DiscardUser

    constructor( discard:Client, user:DiscardUser ){

        this.discard = discard
        this.user = user

        const playerData:PlayerData = {
            theme: 'dark'
        }

        this.discard.enmap.ensure( user.id, playerData)

        user.player = this

    }

    public get data():PlayerData { return this.enmap.get( this.user.id ) }

    public get enmap():any { return this.discard.enmap }

    public async getAvatar():Promise<Image> {
        if(!this.avatar)
        this.avatar = await Canvas.loadImage(this.user.displayAvatarURL)
        return this.avatar
    }

    public get cards():Card[] {
        return this.discard.client.guilds
            .filter( guild => guild.members.has(this.user.id) )
            .map( guild => this.discard.getCard(guild.members.get(this.user.id)) )
    }

    public set theme( theme:string ){
        if(this.discard.themes.hasOwnProperty(theme))
        this.enmap.set( this.user.id, 'theme', theme )
    }

    public get theme():string {
        return this.enmap.get( this.user.id, 'theme' )
    }

}