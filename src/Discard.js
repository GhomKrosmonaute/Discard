
const EventEmitter = require('events')
const Canvas = require('canvas')
const Discord = require('discord.js')
const Card = require('./Card')

class Discard extends EventEmitter {

    constructor( client, decks = [], cards = [] ){ super()

        this.client = client

        for(const deck of decks){
            const { guild_id } = Deck.resolve(deck)
            if(this.client.guilds.has(guild_id))
            this.client.guilds.get(guild_id).deck = new Deck(deck)
            else this.emit('deckRemove', guild_id)
            
        }

        for(const card of cards){
            const { guild_id, user_id } = Card.resolve(card)
            if(this.client.guilds.get(guild_id).members.has(user_id))
            this.client.guilds.get(guild_id).members.get(user_id).card = new Card(card)
            else this.emit('cardRemove', guild_id, user_id)
        }

        this.client.on('guildRemove', guild => {
            delete guild.deck
            this.emit('deckRemove', guild.id)
        })

        this.client.on('guildMemberRemove', member => {
            delete member.card
            this.emit('cardRemove', member.guild.id, member.id)
        })
        
    }

    getDeck( guild ){
        if(guild.deck) return guild.deck
        guild.deck = new Deck(this, guild)
        this.emit('deckCreate', guild, guild.deck)
        return guild.deck
    }

    getCard( member ){
        if(member.card) return member.card
        member.card = new Card(this, member)
        this.emit('cardCreate', member, member.card)
        return member.card
    }

}

module.exports = Discard