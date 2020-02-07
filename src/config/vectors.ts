import { Vector } from './interfaces'
import { VectorName } from './enums'

const vectors:Vector[] = [
    {
        name: VectorName.Card,
        x:0,
        y:0,
        width:400,
        height:600
    },
    {
        name: VectorName.Avatar,
        x:32,
        y:29,
        width:273,
        height:273
    },
    {
        name: VectorName.GuildIcon,
        x:281,
        y:481,
        width:143,
        height:143
    },
    {
        name: VectorName.GuildName,
        x:7,
        y:540,
        width:262,
        height:50
    },
    {
        name: VectorName.InfoTop,
        x:55,
        y:267,
        width:168,
        height:24
    },
    {
        name: VectorName.InfoBottom,
        x:55,
        y:298,
        width:182,
        height:27
    },
    {
        name: VectorName.Body,
        x:27,
        y:349,
        width:282,
        height:25
    }
]

export default vectors