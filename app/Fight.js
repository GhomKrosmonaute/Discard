
const Buffer = require('./Buffer')

module.exports = class Fight {

    constructor( discard, member ){
        this.discard = discard
        this.member = member
    }

    get enmap(){ return this.discard.enmap }

}