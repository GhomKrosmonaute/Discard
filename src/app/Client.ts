
import { Client as DiscordClient, Guild, GuildMember, User } from 'discord.js'
import { DiscardGuild, DiscardGuildMember, DiscardUser, MoveOptions } from '../docs/interfaces'
import { promises as fs } from 'fs'
import { loadImage } from 'canvas'
import Deck from './Deck'
import Card from './Card'
import Player from './Player'

const path = require('path')
const Enmap = require('enmap')

export default class Client {

    public client:DiscordClient
    public enmap:any
    public loaded:Promise<Client>
    public themes:any
    public moveOptions:MoveOptions[]

    constructor( client:DiscordClient, name:string = 'discard' ){

        this.client = client
        this.enmap = new Enmap({name})

        this.loaded = new Promise( async resolve => {
            this.themes = {}
            let files = await fs.readdir('./themes')
            const themes = files.filter( name => !name.includes('.') )
            for(const theme of themes){
                files = await fs.readdir(path.resolve('./themes',theme))
                for(const file of files){
                    if(this.themes[theme] !== undefined)
                    this.themes[theme][file.replace('.png','')] = await loadImage(
                        path.resolve('./themes',theme,file)
                    )
                }
            }
            resolve(this)
        })
        
    }

    public addMove( moveOptions:MoveOptions ): void {
        this.moveOptions.push(moveOptions)
    }

    public getDeck( guild:Guild ): Deck {
        if((guild as any).deck) return (guild as DiscardGuild).deck
        new Deck( this, (guild as DiscardGuild) )
        return (guild as DiscardGuild).deck
    }

    public getCard( member:GuildMember ): Card {
        if((member as any).card) return (member as DiscardGuildMember).card
        new Card( this, (member as DiscardGuildMember) )
        return (member as DiscardGuildMember).card
    }

    public getPlayer( user:User ): Player {
        if((user as any).player) return (user as DiscardUser).player
        new Player( this, (user as DiscardUser) )
        return (user as DiscardUser).player
    }

}