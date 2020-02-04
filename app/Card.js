
const Canvas = require('canvas')
const Discord = require('discord.js')
const drawImage = require('../utils/drawImage')

module.exports = class Card {

    constructor( discard, member ){

        this.discard = discard
        this.member = member

        const data = {
            elo: 1000,
            energy: 10,
            boss: member.id === member.guild.owner.id,
            health: 2,
            speed: 2,
            attack: 2,
            moves: []
        }
        data.power = Math.ceil( Math.random() * 5 ) + (data.boss ? 10 : 0)
        for(let i=0; i<data.power; i++){
            const rdm = Math.random()
            if(rdm < 1/3)       data.health ++
            else if(rdm < 2/3)  data.speed ++
            else                data.attack ++
        }

        discard.enmap.ensure( guild.id + '-' + member.id, data)
        
        member.card = this

    }

    get enmap(){ return this.discard.enmap }

    _getProp( name ){ return this.enmap.get( guild.id + '-' + member.id, name ) }
    _setProp( name, value ){ this.enmap.set( guild.id + '-' + member.id, name, value ) }

    get boss(){ return this._getProp('boss') }

    get elo(){ return this._getProp('elo') }
    set elo( elo ){ this._setProp( 'elo', elo ) }

    get energy(){ return this._getProp('energy') }
    set energy( energy ){ this._setProp( 'energy', energy ) }

    get health(){ return this._getProp('health') }
    get speed(){ return this._getProp('speed') }
    get attack(){ return this._getProp('attack') }
    get moves(){ return this._getProp('moves') }

    get deck(){ return this.discard.getDeck( this.member.guild ) }
    get player(){ return this.discard.getPlayer( this.member.user ) }

    get theme(){ return this.discard.template[this.discard.getPlayer( this.member.user ).theme] }
    set theme( theme ){ this.discard.getPlayer( this.member.user ).theme = theme }

    async get canvas(){
        await this.discard.loaded
        const canvas = Canvas.createCanvas( 400, 600 )
        const ctx = this.canvas.getContext('2d')

        // await this.player.avatar
        drawImage( ctx, this.theme.background )
        drawImage( ctx, await this.player.avatar, 'avatar' )
        drawImage( ctx, this.theme.middle )
        drawImage( ctx, this.theme.foreground )

        return canvas
    }

    async get attachment(){
        return new Discord.Attachment( (await this.canvas).toBuffer(), `card.png` )
    }

}