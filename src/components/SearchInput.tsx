import React from 'react';
import {Col, Input, Row} from "antd";
import {ApolloError} from "@apollo/client";

export default function SearchInput({error, onSearch, align="right"}: { error: ApolloError | undefined, onSearch:(value:string) => void, align?: any}) {
    return (
        <>
            <Row style={{textAlign: align}}><Col span={24}>{error &&
            <span className="test-error" style={{paddingTop: "2px", marginRight: "30px", color: "red"}}>No item found</span>}<Input.Search
                placeholder="search by name" allowClear onSearch={onSearch} style={{width: 200}}/></Col></Row>
        </>
    )
}

