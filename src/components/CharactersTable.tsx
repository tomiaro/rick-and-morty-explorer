import {Link} from "react-router-dom"
import {Table} from 'antd'
import React from "react";
import {ColumnsType} from "antd/es/table";
import {ICharacter} from "../store/model/character/interfaces";

export default function CharactersTable({data, title} : {data:ICharacter[], title:string}) {

    function sortString(a:string,b:string) : number{
        return a.localeCompare(b)
    }

    const columns : ColumnsType<ICharacter>= [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: {compare: (a, b) => sortString(a.name,b.name), multiple: 1},
            render: (text: string, record:ICharacter) => <Link to={"/character/" + record.id}>{record.name}</Link>,
        },
        {
            title: 'Species',
            dataIndex: 'species',
            sorter: {compare: (a, b) => sortString(a.name,b.name), multiple: 2},
        },
        {
            title: 'Status',
            dataIndex: 'status',
            filters: [
              { text: 'Dead', value: 'Dead' },
              { text: 'unknown', value: 'unknown' },
              { text: 'Alive', value: 'Alive' },
            ],
            sorter: {compare: (a, b) => sortString(a.name,b.name), multiple: 3},
            onFilter: (value:any, record) => record.status.indexOf(value) === 0,
        },
    ];

    return (
        <Table
            rowKey="id"
            title={() => <b>{title}</b>}
            dataSource={data}
            columns={columns}
            size={"small"}
        >
        </Table>
    )

}