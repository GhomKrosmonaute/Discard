
module.exports = class Deck extends Discord.Collection {

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

    fetch(){
        this.clear()
        this.guild.members.forEach( member => {
            this.set( member.id, this.discard.getCard(member) )
        })
    }

    get enmap(){ return this.discard.enmap }

    get elo(){ return this.enmap.get( guild.id, 'elo' ) }
    set elo( elo ){ this.enmap.set( guild.id, 'elo', elo ) }

}