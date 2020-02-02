
# Discard

Discord card game staging the members of Discord. Each guild is a deck.

## Usage:

```js
const Discord = require('discord.js')
const Discard = require('discard')

const client = new Discord.Client()
const discard = new Discard.Client( client )

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