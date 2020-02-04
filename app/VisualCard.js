
BITE

// const Canvas = require('canvas')
// const Discord = require('discord.js')

// var background, foreground;

// class VisualCard {

//     constructor( card ){

//         this.card = card

//         this.height = 500
//         this.width = Math.round(this.height * (2/3))

//         this.canvas = Canvas.createCanvas( width, height )
//         this.ctx = this.canvas.getContext('2d')

//     }

//     async make(){

//         this.avatar = await Canvas.loadImage(this.card.member.user.displayAvatarURL)

//         if(!background)
//         background = await Canvas.loadImage(__dirname + '\\..\\img\\background.png')

//         if(!foreground)
//         foreground = await Canvas.loadImage(__dirname + '\\..\\img\\foreground.png')

//         this.ctx.drawImage( this.background, 0, 0, this.width, this.height )
//         this.drawCadre()
//         this.ctx.globalAlpha = .8
//         this.drawName()

//         return this
//     }

//     get attachment(){
//         return new Discord.Attachment( this.canvas.toBuffer(), `card-${this.card.member.id}-${this.card.member.guild.id}.png` )
//     }

//     drawCadre(){
//         const border = this.width * (5/7)
//         this.ctx.translate( border * -.5, border * -.5 )
//         this.ctx.drawImage( this.avatar, this.width * .5, this.width * .495, border, border )
//         this.ctx.setTransform(1, 0, 0, 1, 0, 0)
//     }

//     drawName(){
//         this.ctx.font = (width / 7) + "px Verdana"
//         this.ctx.textAlign = 'center'
//         let gradient = this.ctx.createLinearGradient( 0, 0, this.width, 0 )
//         gradient.addColorStop( 0, "orange" )
//         gradient.addColorStop( .5, "white" )
//         gradient.addColorStop( 1, "orange" )
//         this.ctx.fillStyle = gradient
//         gradient = this.ctx.createLinearGradient( 0, 0, this.width, 0 )
//         gradient.addColorStop( 0, "pink" )
//         gradient.addColorStop( .5, "black" )
//         gradient.addColorStop( 1, "pink" )
//         this.ctx.strokeStyle = gradient
//         this.ctx.strokeText( this.card.member.user.username, this.width / 2, this.width / 8)
//         this.ctx.fillText( this.card.member.user.username, this.width / 2, this.width / 8)
//     }

// }