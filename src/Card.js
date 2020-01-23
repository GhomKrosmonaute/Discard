
const Discord = require('discord.js')
const VisualCard = require('./VisualCard')

class Card {

    constructor( discard, options ){

        if(options instanceof Discord.GuildMember){
            this.member = options
            this.genProps()
        }else if(typeof options === 'string'){
            this.fromString(options)
        }else{
            this.power = options.power
            this.health = options.health
            this.shield = options.shield
            this.energy = options.energy
        }

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

    toString(){

        return [
            this.member.guild.id,
            this.member.id,
            this.power,
            this.shield,
            this.energy
        ].join('/')

    }

    fromString( string ){

        const {
            guild_id,
            user_id,
            power,
            health,
            shield,
            energy
        } = Card.resolve(string)

        if(!this.discard.client.guilds.has(guild_id)){
            return this.discard.emit('deckRemove', guild_id)
        }
        if(!this.discard.client.guilds.get(guild_id).members.has(user_id)){
            return this.discard.emit('cardRemove', guild_id, user_id)
        }

        this.member = this.discard.client.guilds.get(guild_id).members.get(user_id)
        this.power = power
        this.health = health
        this.shield = shield
        this.energy = energy

    }

    static resolve( string ){
        const [
            guild_id,
            user_id,
            power,
            health,
            shield,
            energy,
        ] = string.split('/')
        return {
            guild_id,
            user_id,
            power,
            health,
            shield,
            energy
        }
    }

}

module.exports = Card