
import Client from './Client'
import { Image } from 'canvas'
import { DiscardUser } from '../docs/interfaces'

const Canvas = require('canvas')

export default class Player {

    public discard:Client
    public avatar:Image
    public user:DiscardUser

    constructor( discard:Client, user:DiscardUser ){

        this.discard = discard
        this.user = user

        if(!this.discard.enmap.has( user.id ))
        this.discard.enmap.set( user.id, {
            theme: 'dark'
        })

        user.player = this

    }

    get enmap(){ return this.discard.enmap }

    async getAvatar():Promise<Image> {
        if(!this.avatar)
        this.avatar = await Canvas.loadImage(this.user.displayAvatarURL)
        return this.avatar
    }

    get cards(){
        return this.discard.client.guilds
            .filter( guild => guild.members.has(this.user.id) )
            .map( guild => this.discard.getCard(guild.members.get(this.user.id)) )
    }

    set theme( theme ){
        if(this.discard.themes.hasOwnProperty(theme))
        this.enmap.set( this.user.id, 'theme', theme )
    }

    get theme(){
        return this.enmap.get( this.user.id, 'theme' )
    }

}