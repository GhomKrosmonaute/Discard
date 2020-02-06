
import { MoveOptions } from '../docs/interfaces'
import Fight from './Fight'

export default class Move {

    public fight:Fight

    constructor( fight:Fight, options:MoveOptions ){
        
        this.fight = fight
        Object.assign( this, options )

    }

}