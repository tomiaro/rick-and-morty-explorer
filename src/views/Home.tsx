import React from 'react';
import {Col, Row, Card} from 'antd'
import {useHistory} from "react-router-dom";


export default function Home() {
    const history = useHistory();

    function handleCardClick(target: string) {
        history.push("/" + target)
    }

    return (
        <div className="text-center">
            <Row><Col span={24}><h1 className="headings-1">Welcome to Rick and Morty API Explorer!!</h1></Col></Row>
            <img src={require("../assets/images/home.png").default} height="300" width="500" alt="Rick and Morty"/>
            <Row style={{marginTop: "25px", marginBottom: "25px"}}><Col span={24}><h2 className="headings-2">Are you
                dare to explore?</h2></Col></Row>
            <Row>
                <Col md={8} sm={24}>
                    <Card onClick={() => handleCardClick("episode")} hoverable className="card-home"
                          cover={<img alt="example" width="240" height="360"
                                      src={require("../assets/images/hologramRick.jpeg").default}/>}>
                        <Card.Meta title="Episodes"/>
                    </Card>
                </Col>
                <Col md={8} sm={24}>
                    <Card onClick={() => handleCardClick("character")} hoverable className="card-home"
                          cover={<img alt="example" height="360"
                                      src={require("../assets/images/characters.jpeg").default}/>}>
                        <Card.Meta title="Characters"/>
                    </Card>
                </Col>
                <Col md={8} sm={24}>
                    <Card onClick={() => handleCardClick("location")} hoverable className="card-home"
                          cover={<img alt="example" width="240" height="360"
                                      src={require("../assets/images/planeLocation.jpeg").default}/>}>
                        <Card.Meta title="Locations"/>
                    </Card>
                </Col>

            </Row>
        </div>
    )
}

