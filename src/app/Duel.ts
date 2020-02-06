
import Client from './Client'
import { GuildMember, Guild } from 'discord.js'
import Fight from './Fight'
import Card from './Card'

export default class Duel extends Fight {

    private cards:Card[]

    constructor( discard:Client, member:GuildMember, otherMember:GuildMember ){ super( discard, member )

        this.cards = [
            this.discard.getCard(member),
            this.discard.getCard(otherMember)
        ]

    }

}