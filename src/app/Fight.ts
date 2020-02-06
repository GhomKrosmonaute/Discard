
import Buffer from './Buffer'
import Client from './Client'
import { GuildMember } from 'discord.js'

export default class Fight {

    public discard:Client
    public member:GuildMember

    constructor( discard:Client, member:GuildMember ){
        this.discard = discard
        this.member = member
    }

    get enmap(): any { return this.discard.enmap }

}