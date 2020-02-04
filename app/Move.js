// make a class to add live-fight properties to moves

/**
 * @typedef {Object} MoveOptions
 * @property {String} name Nom de la capacité
 * @property {String[]} tags Tags sémantiques ['stat','debuff','buff','bonus','malus']
 * @property {String[]} targets Cibles possibles ['allies','ally','ennemies','enemy','me','everyone']
 * @property {Number} nitro Cout d'utilisation de la capacité
 * @property {Object} [buff] Liste des stats touchése par le buff
 * @property {Number} buff.[speed]
 * @property {Number} buff.[attack]
 * @property {String[]} [debuff] Liste des stats touchése par le debuff ['speed','attack']
 */

module.exports = class Move {

    /**
     * @constructor
     * @param {MoveOptions} options 
     */

    constructor( fight, options ){
        
        this.fight = fight
        Object.assign( this, options )

        

    }

}