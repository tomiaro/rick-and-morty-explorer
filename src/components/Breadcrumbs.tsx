import React from 'react';
import { Breadcrumb} from 'antd'
import {useLocation} from "react-router-dom"
import {Link} from "react-router-dom"
//naive implementation
export default function Breadcrumbs({routes} : {routes:{name: string, text:string}[]}) {
    const location = useLocation<Location>()

    const route = routes.find(item => location.pathname.includes(item.name))

    if (!route) return <></>

    const regex: RegExp = new RegExp("^/" + route.name + "/\\d+$")

    return (
            <Breadcrumb>
                <Breadcrumb.Item ><Link to="/">Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link to={"/" + route.name} style={{fontWeight: regex.test(location.pathname) ? "normal" : "bold"}}>List</Link></Breadcrumb.Item>
                {regex.test(location.pathname) && <Breadcrumb.Item><b>{route.text}</b></Breadcrumb.Item>}
            </Breadcrumb>
    )



}

