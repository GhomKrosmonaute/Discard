
module.exports = class Deck extends Discord.Collection {

    constructor( discard, guild ){ super()

        this.discard = discard
        this.guild = guild

        if(!this.discard.enmap.has( guild.id ))
        this.discard.enmap.set( guild.id, {
            elo: 1000,
            energy: 10,
            cards: {}
        })

        guild.deck = this

    }

    get enmap(){ return this.discard.enmap }

    get elo(){ return this.enmap.get( guild.id, 'elo' ) }
    set elo( elo ){ this.enmap.set( guild.id, 'elo', elo ) }

    get cards(){ return this.guild.members.map( member => this.discard.getCard(member) ) }

}