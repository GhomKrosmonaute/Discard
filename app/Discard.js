
const { loadImage } = require('canvas')
const fs = require('fs').promises
const Enmap = require('enmap')
const Card = require('./Card')
const Deck = require('./Deck')
const Player = require('./Player')

class Client {

    constructor( client, name = 'discard' ){ super()

        this.client = client
        this.enmap = new Enmap({name})

        this.loaded = new Promise( async resolve => {
            this.template = {}
            let files = await fs.readdir('../template')
            const themes = files.filter( name => !name.includes('.') )
            for(const theme of themes){
                files = await fs.readdir('../template/' + theme)
                for(const file of files){
                    this.template[theme][file.replace('.png','')] = await loadImage(`../template/${theme}/${file}`)
                }
            }
            resolve(this)
        })
        
    }

    addMove(){
        // TODO
    }

    getDeck( guild ){
        if(guild.deck) return guild.deck
        new Deck( this, guild )
        return guild.deck
    }

    getCard( member ){
        if(member.card) return member.card
        new Card( this, member )
        return member.card
    }

    getPlayer( user ){
        if(user.player) return user.player
        new Player( this, user )
        return user.player
    }

}

module.exports = {
    Client,
    Card,
    Deck,
    Player
}