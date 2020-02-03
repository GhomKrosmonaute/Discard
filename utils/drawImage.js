
const vectors = require('../src/vectors.json')

module.exports = function drawImage( ctx, image, vectorsName = 'card' ){
    ctx.drawImage( image, 
        vectors[vectorsName].x, 
        vectors[vectorsName].y, 
        vectors[vectorsName].width, 
        vectors[vectorsName].height
    )
}