import React from "react";
import {Col, Row} from "antd";

export const ricksHeadIndicator = <img style={{ width: 100, height: 100}} className="test-loading" src={require('../assets/images/loadingRicksHead.gif').default} alt={"Ricks indicator"}/>
export const rickDancingIndicator = <Row className="text-center test-loading"><Col span={24}><img src={require('../assets/images/rickDetailLoading.gif').default} alt="Rick dancing"/></Col></Row>
export const itemErrorIndicator = <Row className="text-center test-error"><Col span={24}><h1>Item with this ID does not exist!</h1></Col><Col span={24}><img src={require('../assets/images/errorRick.gif').default} alt="Drinking Rick"/></Col></Row>

