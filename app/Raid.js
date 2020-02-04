
const Fight = require('./Fight')

module.exports = class Raid extends Fight {

    constructor( discard, member, guild ){ super( discard, member )

        this.decks = [
            this.discard.getDeck(member.guild),
            this.discard.getDeck(guild)
        ]

    }

}