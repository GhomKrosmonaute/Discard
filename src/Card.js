
const Discord = require('discord.js')
const VisualCard = require('./VisualCard')

class Card {

    constructor( discard, serial ){

        if(serial instanceof Discord.GuildMember){
            this.member = serial
            this.genProps()
        }else if(typeof serial === 'string'){
            this.fromString(serial)
        }

    }

    setTheme( theme ){
        if(this.discard.template.hasOwnProperty(theme))
            this.theme = theme
    }

    genProps(){

        for(const theme in this.discard.template){
            this.theme = theme
            break
        }
        
        this.boss = this.member.id === this.member.guild.owner.id
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
        return JSON.stringify(this.toJSON())
    }

    toJSON(){
        return {
            guild_id: this.member.guild.id,
            user_id: this.member.id,
            theme: this.theme,
            boss: this.boss,
            power: this.power,
            shied: this.shield,
            energy: this.energy
        }
    }

    fromString( string ){

        const data = JSON.parse(string)

        const { guild_id, user_id } = data
        delete data.guild_id
        delete data.user_id

        Object.assign( this, data )

        if(!this.discard.client.guilds.has(guild_id))
            return this.discard.emit('deckRemove', guild_id)

        if(!this.discard.client.guilds.get(guild_id).members.has(user_id))
            return this.discard.emit('cardRemove', guild_id, user_id)

        this.member = this.discard.client.guilds.get(guild_id).members.get(user_id)

    }

}

module.exports = Card