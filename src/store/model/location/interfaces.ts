import {ICharacter} from "../character/interfaces"

export interface ILocation {
    id: string
    name: string
    type: string
    dimension: string
    residents: ICharacter[]
}
