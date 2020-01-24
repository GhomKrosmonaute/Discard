
# Discard

Discord card game staging the members of Discord. Each guild is a deck.

## Usage:

```js
const Discord = require('discord.js')
const Discard = require('discard')

const client = new Discord.Client()
const discard = new Discard.Client( client, {
    getCardOnDatabase: member => {
        if(/* check if card is on your database */){
            return cardSerial
        }
        return false
    },
    getDeckOnDatabase: guild => {
        if(/* check if deck is on your database */){
            return deckSerial
        }
        return false
    }
})

discard.on('deckRemove', guild_id => {
    // remove deck from your database
})

discard.on('cardRemove', (guild_id, member_id) => {
    // remove card from your database
})

discard.on('deckCreate', deck => {
    // add deck to your database
    const deckSerial = deck.toString()
})

discard.on('cardCreate', card => {
    // add card to your database
    const cardSerial = card.toString()
})

client.on('message', async message => {

    if(
        message.system || 
        !message.guild || 
        message.author.bot
    ) return

    if(message.content === 'mycard'){
        await discard.loaded
        const card = await discard.getCard(message.member)
        message.channel.send(await card.attachment)
    }

})

client.login(TOKEN)
```

## Entities:

### Discard.Client

```js
// on comming
```

### Discard.Card

```js
// on comming
```

### Discard.Deck

```js
// on comming
```