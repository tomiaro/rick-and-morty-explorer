import React, {useState, useEffect} from 'react';
import {useQuery} from '@apollo/client';
import {Descriptions, Col, Row, List, Divider} from 'antd'
import {useParams} from "react-router-dom"
import {Link} from "react-router-dom"
import {itemErrorIndicator, rickDancingIndicator} from "../utils/indicators";
import {ICharacter} from "../store/model/character/interfaces";
import {ICharacterData, IDetailQueryVars} from "../store/graphql/interfaces";
import {IEpisode} from "../store/model/episode/interfaces";
import {getCharacterDetail} from "../store/graphql/character/queries";


export default function CharacterDetail() {
    const [character, setCharacter] = useState<ICharacter>();
    const {id} = useParams<{ id: string }>()

    const {loading, error, data: apiData} = useQuery<ICharacterData, IDetailQueryVars>(getCharacterDetail, {
        variables: {id: id}
    });

    useEffect(() => {
        if (apiData?.character) {
            setCharacter(apiData.character);
        }

    }, [apiData]);
    if (error) return itemErrorIndicator

    if (loading || !character) return rickDancingIndicator

    return (
        <>
            <h1 className="headings-2 text-center">Character</h1>
            <Divider/>
            <Row>
                <Col sm={24} md={8} lg={12} style={{textAlign: "center"}}>
                    <img src={character.image} alt="Character" height="300" width="300"/>
                </Col>
                <Col sm={24} md={15} lg={12}>
                    <Descriptions className="descriptionTitle test-success" title={character.name}>
                        <Descriptions.Item label="Status">{character.status}</Descriptions.Item>
                        <Descriptions.Item label="Species">{character.species}</Descriptions.Item>
                        <Descriptions.Item label="Gender">{character.gender}</Descriptions.Item>
                        <Descriptions.Item label="Location" span={2}>
                            {character.location.id ?
                                <Link to={"/location/" + character.location.id}>{character.location.name}</Link> :
                                <span>{character.location.name}</span>}
                        </Descriptions.Item>
                        <Descriptions.Item label="Origin" span={1}>
                            {character.origin.id ?
                                <Link to={"/location/" + character.origin.id}>{character.origin.name}</Link> :
                                <span>{character.origin.name}</span>}
                        </Descriptions.Item>
                        {character.type && <Descriptions.Item label="Type">{character.type}</Descriptions.Item>}
                    </Descriptions>
                    <List
                        style={{marginTop: "40px"}}
                        header={<div><strong>In Episodes</strong></div>}
                        bordered
                        dataSource={character.episode}
                        pagination={{defaultPageSize: 5}}
                        renderItem={(item: IEpisode) => (
                            <List.Item>
                                <Link to={"/episode/" + item.id}>{item.name}</Link>
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </>
    )


}

