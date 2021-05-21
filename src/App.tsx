import React from 'react';
import './assets/css/App.css';
import CharacterList from "./views/CharacterList"
import CharacterDetail from "./views/CharacterDetail"
import EpisodeDetail from "./views/EpisodeDetail"
import EpisodeList from "./views/EpisodeList"
import LocationList from "./views/LocationList"
import LocationDetail from "./views/LocationDetail"
import Navbar from "./components/Navbar"
import Home from "./views/Home"
import {Layout} from 'antd';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Breadcrumbs from "./components/Breadcrumbs";
const { Header, Footer, Content} = Layout;



const routes: {name: string, text:string}[]= [{name: "character", text: "Character"}, {name: "episode", text: "Episode"}, {name: "location", text: "Location"}]


function App() {

  return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Layout className="Layout">
                <Header>
                    <Navbar/>
                </Header>
                <Content className="main-content"  style={{ padding: '0 100px' }}>
                    <div style={{ margin: '16px 0' }}>
                        <Breadcrumbs routes={routes} />
                    </div>
                    <div className="site-layout-content">
                        <Switch>
                            <Route exact path="/">
                                <Home/>
                            </Route>
                            <Route exact path="/character">
                                <CharacterList/>
                            </Route>
                            <Route exact path="/character/:id">
                                <CharacterDetail/>
                            </Route>
                            <Route exact path="/episode">
                                <EpisodeList/>
                            </Route>
                            <Route exact path="/episode/:id">
                                <EpisodeDetail/>
                            </Route>
                            <Route exact path="/location">
                                <LocationList/>
                            </Route>
                            <Route exact path="/location/:id">
                                <LocationDetail/>
                            </Route>
                            <Route path='*' exact>
                                <p>Page does not exists!</p>
                            </Route>
                        </Switch>
                    </div>
                </Content>
                <Footer className="text-center">How dare you!</Footer>
            </Layout>
      </BrowserRouter>
  );
}

export default App;