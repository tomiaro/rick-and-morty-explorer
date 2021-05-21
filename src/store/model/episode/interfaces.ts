import {ICharacter} from "../character/interfaces"

export interface IEpisode {
    id: string
    name: string
    air_date: string
    characters: ICharacter[]
}
