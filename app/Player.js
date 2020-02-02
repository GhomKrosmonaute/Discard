
module.exports = class Player {

    constructor( discard, user ){

        this.discard = discard
        this.user = user

        if(!this.discard.enmap.has( user.id ))
        this.discard.enmap.set( user.id, {
            theme: 'dark'
        })

        user.player = this

    }

    set theme( theme ){
        if(this.discard.template.hasOwnProperty(theme))
        this.discard.enmap.set( user.id, 'theme', theme )
    }

    get theme(){
        return this.discard.enmap.get( user.id, 'theme' )
    }

}