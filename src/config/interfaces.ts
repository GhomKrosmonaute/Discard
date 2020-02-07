
import { Tag, Target, Buffable, VectorName } from './enums'
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
    buff?: [Buffable,number][]
    debuff?: Buffable[]
    damage?: number
}

export interface Vector {
    name: VectorName,
    x: number,
    y:number,
    width:number,
    height:number
}

export interface Theme {
    background: Image,
    foreground: Image,
    middle: Image
}

export interface DeckData {
    energy: number,
    elo: number
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