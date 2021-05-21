import React, {useEffect, useState} from 'react';
import {Menu} from 'antd'
import {useLocation} from "react-router-dom"
import {Link} from "react-router-dom"

export default function Navbar() {
    const location = useLocation<Location>()
    const [item, setItem] = useState<string>("")

    useEffect(() => {
        const path: string = location.pathname
        if(path.includes("episode")) setItem("1")
        else if (path.includes("character")) setItem("2")
        else if (path.includes("location")) setItem("3")
        else setItem("")

    }, [location]);



    return (
        <>
          <span><Link to="/" className="header-main">Rick and Morty API Explorer</Link></span>
          <Menu theme="dark" mode="horizontal" style={{fontSize: "15px"}} selectedKeys={[item]}>
              <Menu.Item key="1"><Link to="/episode">Episodes</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/character">Characters</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/location">Locations</Link></Menu.Item>
          </Menu>
        </>
    )



}

