import React, {useState, useEffect} from 'react';
import {useQuery} from '@apollo/client';
import {Table} from 'antd'
import SearchInput from "../components/SearchInput"
import { ricksHeadIndicator} from "../utils/indicators";
import {getPaginationSettings} from "../utils/componentSetting"
import {Link} from 'react-router-dom'
import {ICharacterListData, IListQueryVars} from "../store/graphql/interfaces";
import {ICharacter} from "../store/model/character/interfaces";
import {getCharacterList} from "../store/graphql/character/queries";






function CharacterList() {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [characters, setCharacters] = useState<ICharacter[]>([]);
    const [filterName, setFilterName] = useState<string>("")
    const [totalPagesNumber, setTotalPagesNumber] = useState<number>(0)

    const {loading, error, data: apiData} = useQuery<ICharacterListData, IListQueryVars>(getCharacterList, {
        variables: {page: currentPage, name: filterName}
    });

    useEffect(() => {
        if (apiData?.characters) {
            setCharacters(apiData.characters.results);
            setTotalPagesNumber(apiData.characters.info.count)
        }

    }, [apiData]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'id',
            render: (text: string, record: ICharacter) => <Link className="test-success" to={"/character/" + record.id}>{record.name}</Link>,
        },
        {
            title: 'Species',
            dataIndex: 'species',
            key: "id"
        },
        {
            title: 'Status',
            dataIndex: 'status',
        }
    ];

    function handleSearch(input:string):void{
        setFilterName(input)
    }

    return (
        <>
            <h1 className="headings-2">Characters</h1>
            <SearchInput onSearch={handleSearch} error={error}/>
            <Table rowKey="id" size={"small"} loading={!error && loading && {indicator: ricksHeadIndicator}}
                   pagination={getPaginationSettings(currentPage, (page: number) => setCurrentPage(page), totalPagesNumber)}
                   dataSource={characters} columns={columns}/>;
        </>
    )

}

export default CharacterList;
