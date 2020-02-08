
import Client from './Client'
import { Image } from 'canvas'
import { DiscardUser, PlayerData, Theme } from '../config/interfaces'
import Card from './Card'
import { ThemeName } from '../config/types'

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

    public setTheme( themeName:ThemeName ){
        if(this.discard.themes.has(themeName))
        this.enmap.set( this.user.id, themeName, 'theme' )
    }
    public getTheme():Theme { return this.discard.themes.get(this.enmap.get( this.user.id, 'theme' ) as ThemeName) }

}