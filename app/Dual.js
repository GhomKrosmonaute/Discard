
const Fight = require('./Fight')

module.exports = class Duel extends Fight {

    constructor( discard, member, otherMember ){ super( discard, member )

        this.cards = [
            this.discard.getCard(member),
            this.discard.getCard(otherMember)
        ]

    }

}