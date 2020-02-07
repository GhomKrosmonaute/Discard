import { map } from '../utils/calc'
import { Buffable, Tag, Target } from "./enums"
import { MoveOptions } from './interfaces'

const buffables:Buffable[] = Object.values(Buffable)
const moves:MoveOptions[] = []

// buffable
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
for(const buffable of buffables){
    moves.push({
        name: buffable + 'debuff',
        tags: [Tag.Stat,Tag.Debuff],
        targets: [Target.Ally,Target.Me,Target.Ennemy],
        nitro: 1,
        debuff: [buffable]
    })
    moves.push({
        name: buffable + ' team debuff',
        tags: [Tag.Stat,Tag.Debuff,Tag.Group],
        targets: [Target.Allies,Target.Ennemies],
        nitro: 2,
        debuff: [buffable]
    })
    for(let i=1; i<3; i++){
        moves.push({
            name: buffable + ' boost',
            tags: [Tag.Stat,Tag.Buff,Tag.Bonus],
            targets: [Target.Ally,Target.Me],
            nitro: i,
            buff: [
                [buffable,i]
            ]
        })
        moves.push({
            name: buffable + ' decrease',
            tags: [Tag.Stat,Tag.Buff,Tag.Malus],
            targets: [Target.Ennemy],
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
        tags: [Tag.Attack],
        targets: [Target.Ennemy],
        nitro: i,
        damage: i
    })
    moves.push({
        name: 'group attack',
        tags: [Tag.Attack,Tag.Group],
        targets: [Target.Ennemies],
        nitro: i * 2,
        damage: i
    })
}

// todo: special and heal moves

export default moves