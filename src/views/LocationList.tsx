import React, {useState, useEffect} from 'react';
import {useQuery} from '@apollo/client';
import {Table} from 'antd'
import {ricksHeadIndicator} from "../utils/indicators";
import {getPaginationSettings} from "../utils/componentSetting"
import {Link} from 'react-router-dom'
import SearchInput from "../components/SearchInput";
import {IListQueryVars, ILocationListData} from "../store/graphql/interfaces";
import {ILocation} from "../store/model/location/interfaces";
import {getLocationList} from "../store/graphql/location/queries";


function LocationList() {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [locations, setLocations] = useState<ILocation[]>([]);
    const [totalPagesNumber, setTotalPagesNumber] = useState<number>(0)
    const [filterName, setFilterName] = useState<string>("")

    const {loading, error, data: apiData} = useQuery<ILocationListData, IListQueryVars>(getLocationList, {
        variables: {page: currentPage, name: filterName}
    });

    useEffect(() => {
        if (apiData?.locations) {
            setLocations(apiData.locations.results);
            setTotalPagesNumber(apiData.locations.info.count)
        }

    }, [apiData]);

    function handleSearch(input:string):void{
        setFilterName(input)
    }


    const columns= [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text: string, record:ILocation) => <Link to={"/location/" + record.id}>{record.name}</Link>,
        },
                {
            title: 'Type',
            dataIndex: 'type',
        },
                {
            title: 'Dimension',
            dataIndex: 'dimension',
        }
    ];

    return(
        <>
            <h1 className="headings-2">Locations</h1>
            <SearchInput onSearch={handleSearch} error={error}/>
            <Table rowKey="id" size={"small"} loading={loading && {indicator: ricksHeadIndicator}}
                  pagination={getPaginationSettings(currentPage, (page: number) => setCurrentPage(page), totalPagesNumber)}
                  dataSource={locations} columns={columns}/>
        </>)

}

export default LocationList;
