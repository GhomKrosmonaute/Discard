
const { Collection } = require('discord.js')

module.exports = class Deck {

    constructor( discard, guild ){ super()

        this.discard = discard
        this.guild = guild

        this.enmap.ensure( guild.id, {
            elo: 1000,
            energy: 10,
            cards: {}
        })

        this.fetch()

        guild.deck = this

    }

    get enmap(){ return this.discard.enmap }

    get elo(){ return this.enmap.get( guild.id, 'elo' ) }
    set elo( elo ){ this.enmap.set( guild.id, 'elo', elo ) }

    get cards(){
        const cards = new Collection
        this.guild.members.forEach( member => {
            cards.set( member.id, this.discard.getCard(member) )
        })
    }

    forEach( callback ){ this.cards.forEach(callback) }
    filter( callback ){ return this.cards.filter(callback) }
    map( callback ){ return this.cards.map(callback) }

}