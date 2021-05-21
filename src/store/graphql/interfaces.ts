import {ICharacter} from "../model/character/interfaces";
import {IEpisode} from "../model/episode/interfaces";
import {ILocation} from "../model/location/interfaces";

export interface ICharacterListData{
    characters: {info: {count: number}, results: ICharacter[]}
}

export interface ICharacterData{
    character: ICharacter
}

export interface IEpisodeListData{
    episodes: {info: {count: number}, results: IEpisode[]}
}

export interface IEpisodeData{
    episode: IEpisode
}

export interface ILocationListData{
    locations: {info: {count: number}, results: ILocation[]}
}

export interface ILocationData{
    location: ILocation
}

export interface IDetailQueryVars{
    id: string
}

export interface IListQueryVars{
    page: number
    name: string
}
