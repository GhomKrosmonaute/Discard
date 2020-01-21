
const Canvas = require('canvas')
const enmap = require('enmap')
const Discord = require('discord.js')
const Card = require('./Card')

process.env.database = new Enmap({
    name: "discard",
    autoFetch: true,
    fetchAll: false
})

class Discard {

    constructor(){

    }

    async memberCard( member, options = {} ){


        

        

        

        

        ctx.font = (width / 9) + "px Verdana"
        ctx.fillStyle = 'white'
        ctx.strokeText(props.hp, width * (1.35/5), height * (2.02/3))
        ctx.fillText(props.hp, width * (1.35/5), height * (2.02/3))
        ctx.strokeText(props.sh, width * (3/5), height * (2.02/3))
        ctx.fillText(props.sh, width * (3/5), height * (2.02/3))
        ctx.strokeText(props.at, width * (4.35/5), height * (2.02/3))
        ctx.fillText(props.at, width * (4.35/5), height * (2.02/3))

        ctx.globalAlpha = 1

        ctx.font = (width / 12) + "px Verdana"
        ctx.fillStyle = '#FFBF00'
        ctx.textAlign = 'right'
        ctx.fillText(props.pw, width - (width / 11), height - 2)

        ctx.font = (width / 15) + "px Verdana"
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.fillText(member.guild.name, width / 2, height - 5, width * .6)

        ctx.drawImage( this.foreground, 0, 0, width, height )

        return new Card( member, canvas, props )
    }

}

module.exports = Discard