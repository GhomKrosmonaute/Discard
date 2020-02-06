
import Deck from './Deck'
import Fight from './Fight'
import Client from './Client'
import { GuildMember, Guild } from 'discord.js'

export default class Raid extends Fight {

    public decks:Deck[]

    constructor( discard:Client, member:GuildMember, guild:Guild ){ super( discard, member )

        this.decks = [
            this.discard.getDeck(member.guild),
            this.discard.getDeck(guild)
        ]

    }

}