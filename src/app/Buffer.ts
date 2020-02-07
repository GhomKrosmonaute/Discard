
import { map } from '../utils/calc'

const maxState:number = 4

export default class Buffer {

    private _state:number = 0
    private _stat:number

    constructor( stat:number ){
        this._stat = stat
    }

    public get stat():number {
        return map(this._state, 0, maxState, this._stat, this._stat * 2)
    }

    public buff( raise:boolean = false ):boolean {
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

    public debuff():boolean {
        if(this._state === 0)
        return false
        this._state = 0
        return true
    }

}