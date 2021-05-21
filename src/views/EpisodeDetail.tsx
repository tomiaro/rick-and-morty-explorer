import React, {useState, useEffect} from 'react';
import {useQuery} from '@apollo/client';
import {Divider, Col, Row} from 'antd'
import {useParams} from "react-router-dom"

import CharactersTable from "../components/CharactersTable";
import {itemErrorIndicator, rickDancingIndicator} from "../utils/indicators";
import {IDetailQueryVars, IEpisodeData} from "../store/graphql/interfaces";
import {IEpisode} from "../store/model/episode/interfaces";
import {getEpisodeDetail} from "../store/graphql/episode/queries";






export default function EpisodeDetail() {
    const [episode, setEpisode] = useState<IEpisode>();
    const {id} = useParams<{ id: string }>()

    const {loading, error, data: apiData} = useQuery<IEpisodeData, IDetailQueryVars>(getEpisodeDetail, {
        variables: {id: id}
    });

    useEffect(() => {
        if (apiData?.episode) {
            setEpisode(apiData.episode);
        }

    }, [apiData]);


    if (error) return itemErrorIndicator

    if (loading || !episode) return rickDancingIndicator


    return (
        <>
            <h1 className="headings-2 text-center">Episode</h1>
            <Divider/>
            <div className="text-center">
                <span className="description-main">{episode.name}</span>
                <br/>
                <span className="description">Air date: {episode.air_date}</span>
            </div>
            <Row>
                <Col span={24} style={{marginTop: "40px"}}>
                    <CharactersTable title="Characters" data={episode.characters}/>
                </Col>
            </Row>
        </>
    )


}

