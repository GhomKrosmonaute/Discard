
const buffableStats = [ 'speed', 'attack' ]
const template = {
    name: 'subarashi move',
    tags: ['stat','debuff','buff','bonus','malus'],
    targets: ['allies','ally','ennemies','enemy','me','everyone'],
    nitro: 1,
    buff: {},
    debuff: []
}

const moves = []

// stat
moves.push({
    name: 'debuff',
    tags: ['stat','debuff',...buffableStats],
    targets: ['ally','me','ennemy'],
    nitro: 2,
    debuff: buffableStats
})
moves.push({
    name: 'global debuff',
    tags: ['stat','debuff',...buffableStats],
    targets: ['everyone'],
    nitro: 3,
    debuff: buffableStats
})
for(const stat of buffableStats){
    moves.push({
        name: stat + 'debuff',
        tags: ['stat','debuff',stat],
        targets: ['ally','me','ennemy'],
        nitro: 1,
        debuff: [stat]
    })
    moves.push({
        name: stat + ' team debuff',
        tags: ['stat','debuff','group',stat],
        targets: ['allies','ennemies'],
        nitro: 2,
        debuff: [stat]
    })
    for(let i=1; i<5; i++){
        moves.push({
            name: stat + ' boost',
            tags: ['stat','buff','bonus',stat],
            targets: ['ally','me'],
            nitro: i,
            buff: {
                [stat]: 10 * i // in percent of base stat
            }
        })
        moves.push({
            name: stat + ' decrease',
            tags: ['stat','buff','malus',stat],
            targets: ['ennemy'],
            nitro: i,
            buff: {
                [stat]: -10 * i // in percent of base stat
            }
        })
    }
}

// TODO: attack, special and heal moves

// console.log(JSON.stringify(moves,null,2))

module.exports = moves