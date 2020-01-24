
const fs = require('fs').promises
const EventEmitter = require('events')
const { loadImage } = require('canvas')
const Card = require('./Card')
const Deck = require('./Deck')

class Client extends EventEmitter {

    constructor( client, callbacks ){ super()

        this.client = client

        this.getCardOnDatabase = callbacks.getCardOnDatabase
        this.getDeckOnDatabase = callbacks.getDeckOnDatabase

        this.client.on('guildRemove', guild => {
            guild.deck.forEach( card => {
                this.emit('cardRemove', card.member.guild.id, card.member.id)
            })
            delete guild.deck
            this.emit('deckRemove', guild.id)
        })

        this.client.on('guildMemberRemove', member => {
            const deck = this.getDeck(member.guild)
            deck.delete(member.id)
            this.emit('cardRemove', member.guild.id, member.id)
        })

        this.loaded = new Promise( async resolve => {
            this.template = {}
            let files = await fs.readdir('../template')
            const folders = files.filter( name => !name.includes('.') )
            for(const folder of folders){
                files = await fs.readdir('../template/' + folder)
                for(const file of files){
                    this.template.folder[file.replace('.png','')] = await loadImage(`../template/${folder}/${file}`)
                }
            }
            resolve(this)
        })
        
    }

    async getDeck( guild ){
        if(guild.deck) return guild.deck
        const serialDeck = await this.getDeckOnDatabase( guild )
        guild.deck = (new Deck(this, serialDeck)) || (new Deck(this, guild))
        this.emit('deckCreate', guild.deck)
        return guild.deck
    }

    async getCard( member ){
        const deck = this.getDeck(member.guild)
        if(deck.has(member.id)) 
        return deck.get(member.id)
        const serialDeck = await this.getCardOnDatabase( member )
        deck.set(member.id, (new Card(this, serialDeck)) || (new Card(this, member)))
        this.emit('cardCreate', deck.get(member.id))
        return deck.get(member.id)
    }

}

module.exports = {
    Client,
    Card,
    Deck
}