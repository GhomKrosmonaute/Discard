
const Discord = require('discord.js')
const VisualCard = require('./VisualCard')

class Card {

    constructor( member ){

        this.boss = member.guild.owner.id === member.id
        this.member = member
        this.visual = new VisualCard( this )
        

    }

    genProps(){

        this.power = Math.ceil( Math.random() * 5 ) + (this.boss ? 10 : 0)
        this.health = 2
        this.shield = 2
        this.energy = 2

        for(let i=0; i<this.power; i++){
            const rdm = Math.random()
            if(rdm < 1/3)       this.health ++
            else if(rdm < 2/3)  this.shield ++
            else                this.energy ++
        }

    }

    get attachment(){
        return this.visual.attachment
    }

}

module.exports = Card