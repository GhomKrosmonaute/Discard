
const Discord = require('discord.js')

class Deck extends Discord.Collection {

    constructor( discard, serial ){ super()

        if(serial instanceof Discord.Guild){
            this.guild = serial
            this.genProps()
        }else if(typeof serial === 'string'){
            this.fromString(serial)
        }

    }

    genProps(){

        this.win = 0
        this.lose = 0

    }

}