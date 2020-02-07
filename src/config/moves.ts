import { map } from '../utils/calc'
import { Buffable, Tag, Target } from "./enums"
import { MoveOptions } from './interfaces'

const buffables = Object.values(Buffable)
const moves:MoveOptions[] = []

// stat
moves.push({
    name: 'debuff',
    tags: [Tag.Stat,Tag.Debuff],
    targets: [Target.Ally,Target.Me,Target.Ennemy],
    nitro: 2,
    debuff: [Buffable.All]
})
moves.push({
    name: 'global debuff',
    tags: [Tag.Stat,Tag.Debuff],
    targets: [Target.Everyone],
    nitro: 3,
    debuff: [Buffable.All]
})
for(const stat of buffables){
    moves.push({
        name: stat + 'debuff',
        tags: [Tag.Stat,Tag.Debuff],
        targets: [Target.Ally,Target.Me,Target.Ennemy],
        nitro: 1,
        debuff: [stat as Buffable]
    })
    moves.push({
        name: stat + ' team debuff',
        tags: [Tag.Stat,Tag.Debuff,Tag.Group],
        targets: [Target.Allies,Target.Ennemies],
        nitro: 2,
        debuff: [stat as Buffable]
    })
    for(let i=1; i<3; i++){
        moves.push({
            name: stat + ' boost',
            tags: [Tag.Stat,Tag.Buff,Tag.Bonus],
            targets: [Target.Ally,Target.Me],
            nitro: i,
            buff: [
                [stat as Buffable,i]
            ]
        })
        moves.push({
            name: stat + ' decrease',
            tags: [Tag.Stat,Tag.Buff,Tag.Malus],
            targets: [Target.Ennemy],
            nitro: i,
            buff: [
                [stat as Buffable,-i]
            ]
        })
    }
}

// attack
for(let i=1; i<5; i++){
    moves.push({
        name: 'attack',
        tags: [Tag.Attack],
        targets: [Target.Ennemy],
        nitro: i,
        damage: i
    })
}

// todo: special and heal moves

export default moves