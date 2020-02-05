
const maxState = 4

module.exports = class Buffer {

    constructor( stat ){

        this._stat = stat
        this._state = 0

    }

    get stat(){
        return map(this._state, 0, maxState, this._stat, this._stat * 2)
    }

    buff( raise ){
        if(raise){
            if(this._state < maxState){
                this._state ++
                return true
            }
        }else{
            if(this._state > -maxState){
                this._state --
                return true
            }
        }
        return false
    }

    debuff(){
        if(this._state === 0)
        return false
        this._state = 0
        return true
    }

}

function map(n, start1, stop1, start2, stop2){
    return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2
}