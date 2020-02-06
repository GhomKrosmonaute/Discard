
import { Tag, Target, Buffable } from './enums'
import { Guild, GuildMember, User } from 'discord.js'
import Deck from '../app/Deck'
import Card from '../app/Card'
import Player from '../app/Player'
import { Image } from 'canvas'

export interface MoveOptions {
    name: string,
    tags: Tag[],
    targets: Target[],
    nitro: number,
    buff?: {
        speed?: number,
        attack?: number
    }
    debuff?: Buffable[]
}

export interface Theme {
    background: Image,
    foreground: Image,
    middle: Image
}

export interface DeckData {
    
}

export interface CardData {
    power: number,
    elo: number,
    energy: number,
    boss: boolean,
    health: number,
    speed: number,
    attack: number,
    moves: MoveOptions[]
}

export interface PlayerData {
    theme: string
}

export interface DiscardGuild extends Guild {
    deck: Deck
}

export interface DiscardGuildMember extends GuildMember {
    card: Card
}

export interface DiscardUser extends User {
    player: Player
}