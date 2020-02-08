import { xprod } from '../utils/calc'
import { Buffable, Tag, Target } from "./types"
import { MoveOptions } from './interfaces'

const buffables:Buffable[] = [ 'attack', 'speed', 'all' ]
const moves:MoveOptions[] = []

// buffable
moves.push({
    name: 'debuff',
    tags: ['stat','debuff'],
    targets: ['ally','me','ennemy'],
    nitro: 2,
    debuff: ['all']
})
moves.push({
    name: 'global debuff',
    tags: ['stat','debuff'],
    targets: ['everyone'],
    nitro: 3,
    debuff: ['all']
})
for(const buffable of buffables){
    moves.push({
        name: buffable + 'debuff',
        tags: ['stat','debuff'],
        targets: ['ally','me','ennemy'],
        nitro: 1,
        debuff: [buffable]
    })
    moves.push({
        name: buffable + ' team debuff',
        tags: ['stat','debuff','group'],
        targets: ['allies','ennemies'],
        nitro: 2,
        debuff: [buffable]
    })
    for(let i=1; i<3; i++){
        moves.push({
            name: buffable + ' boost',
            tags: ['stat','buff','bonus'],
            targets: ['ally','me'],
            nitro: i,
            buff: [
                [buffable,i]
            ]
        })
        moves.push({
            name: buffable + ' decrease',
            tags: ['stat','buff','malus'],
            targets: ['ennemy'],
            nitro: i,
            buff: [
                [buffable,-i]
            ]
        })
    }
}

// attack
for(let i=1; i<5; i++){
    moves.push({
        name: 'attack',
        tags: ['attack'],
        targets: ['ennemy'],
        nitro: i,
        damage: i
    })
    moves.push({
        name: 'group attack',
        tags: ['attack','group'],
        targets: ['ennemies'],
        nitro: i * 2.5,
        damage: i
    })
}

// todo: special and heal moves

export default moves