import {gql} from "@apollo/client";


export const getEpisodeDetail = gql`
    query EpisodeDetail($id: ID!){
        episode(id:$id){
            id
            name
            air_date
            characters{
                id
                name
                species
                status
            }
        }
    }`

export const getEpisodeList = gql`
    query ($page: Int, $name:String) {
        episodes (page: $page, filter: { name: $name }) {
            info {
                count
            }
            results {
                id
                name
                air_date
            }
        }
    }
`