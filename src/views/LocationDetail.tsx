import React, {useState, useEffect} from 'react';
import {useQuery} from '@apollo/client';
import {Divider, Col, Row} from 'antd'
import {useParams} from "react-router-dom"
import CharactersTable from "../components/CharactersTable";
import { rickDancingIndicator, itemErrorIndicator} from "../utils/indicators";
import {IDetailQueryVars, ILocationData} from "../store/graphql/interfaces";
import {ILocation} from "../store/model/location/interfaces";
import {getLocationDetail} from "../store/graphql/location/queries";


export default function LocationDetail() {
    const [location, setLocation] = useState<ILocation>();

    const {id} = useParams<{id:string}>()

    const {loading, error, data: apiData} = useQuery<ILocationData, IDetailQueryVars>(getLocationDetail, {
        variables: {id: id}
    });

    useEffect(() => {
        if (apiData?.location) {
            setLocation(apiData.location);
        }

    }, [apiData]);


    if (error) return itemErrorIndicator

    if (loading || !location) return rickDancingIndicator


     return (
         <>
             <h1 className="headings-2 text-center">Location</h1>
            <Divider/>
             <div className="text-center">
             <h2 className="description-main">{location.name}</h2>
             <Row><Col span={12}><span className="description">Type: {location.type}</span></Col><Col span={12}><span className="description">Dimension: {location.dimension}</span></Col></Row>
             </div>
        <Row >
            <Col span={24} style={{marginTop: "40px"}}>
                <CharactersTable title="Residents" data={location.residents}/>
            </Col>

        </Row>
         </>
    )



}

