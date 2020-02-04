
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

    get enmap(){ return this.discard.enmap }

    async get avatar(){
        if(!this.avatar)
        this.avatar = await Canvas.loadImage(this.card.member.user.displayAvatarURL)
        return this.avatar
    }

    get cards(){
        return this.discard.client.guilds
            .filter( guild => guild.members.has(this.user.id) )
            .map( guild => this.discard.getCard(guild.members.get(this.user.id)) )
    }

    set theme( theme ){
        if(this.discard.template.hasOwnProperty(theme))
        this.enmap.set( user.id, 'theme', theme )
    }

    get theme(){
        return this.enmap.get( user.id, 'theme' )
    }

}