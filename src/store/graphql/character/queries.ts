import {gql} from "@apollo/client";

export const getCharacterDetail = gql`
    query CharacterDetail($id: ID!){
        character(id:$id){
            id
            name
            status
            species
            type
            gender
            image
            origin{
                id
                name
            }
            location{
                id
                name
            }
            episode{
                id
                name
            }
        }
    }
`

export const getCharacterList = gql`
    query CharacterList($page: Int, $name:String){
        characters(page: $page, filter: { name: $name }) {
            info {
                count
            }
            results {
                id
                name
                status
                species
            }
        }
    }
`