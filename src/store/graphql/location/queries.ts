import {gql} from "@apollo/client";


export const getLocationDetail = gql`
    query LocationDetail($id: ID!){
        location(id:$id){
            id
            name
            type
            dimension
            residents{
                id
                name
                status
                species
            }
        }
    }`

export const getLocationList = gql`
    query ($page: Int!) {
        locations (page: $page) {
            info {
                count
            }
            results {
                id
                name
                type
                dimension
            }
        }
    }`