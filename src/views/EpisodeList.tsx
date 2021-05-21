import React, {useState, useEffect} from 'react';
import {useQuery} from '@apollo/client';
import {Table} from 'antd'
import {ricksHeadIndicator} from "../utils/indicators";
import {getPaginationSettings} from "../utils/componentSetting"
import {Link} from 'react-router-dom'
import SearchInput from "../components/SearchInput";
import {IEpisodeListData, IListQueryVars} from "../store/graphql/interfaces";
import {IEpisode} from "../store/model/episode/interfaces";
import {getEpisodeList} from "../store/graphql/episode/queries";

function EpisodeList() {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [episodes, setEpisodes] = useState<IEpisode[]>([]);
    const [totalPagesNumber, setTotalPagesNumber] = useState<number>(0)
    const [filterName, setFilterName] = useState<string>("")

    const {loading, error, data: apiData} = useQuery<IEpisodeListData, IListQueryVars>(getEpisodeList, {
        variables: {page: currentPage, name: filterName}
    });

    useEffect(() => {
        if (apiData?.episodes) {
            setEpisodes(apiData.episodes.results);
            setTotalPagesNumber(apiData.episodes.info.count)
        }

    }, [apiData]);

    function handleSearch(input:string):void{
        setFilterName(input)
    }

    const columns= [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text: string, record:IEpisode) => <Link to={"/episode/" + record.id}>{record.name}</Link>,
        },
        {
            title: "Air date",
            dataIndex: "air_date"

        }
    ];

    return(
        <>
            <h1 className="headings-2">Episodes</h1>
            <SearchInput onSearch={handleSearch} error={error}/>
            <Table rowKey="id" size={"small"} loading={!error && loading && {indicator: ricksHeadIndicator}}
                   pagination={getPaginationSettings(currentPage, (page: number) => setCurrentPage(page), totalPagesNumber)}
                   dataSource={episodes} columns={columns}/>;
        </>
    )

}

export default EpisodeList;
