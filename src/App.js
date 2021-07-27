import * as React from "react";
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-json-server';
// import { PostList, PostShow } from './posts';
// import { CalendarList } from './calendar';
import { BoardgameShow, BoardgameList, BoardgameCreate } from './components/Boardgame';
import { ScrapedDataShow, ScrapedDataList } from "./components/ScrapedData";
import { StoreList } from './components/Store';
import { PlayerList, PlayerCreate } from './components/Player';
import { PlayList, PlayCreate } from './components/Play';
import { StatsList, StatsCreate } from './components/Stats';
import { atlasReducer } from './components/reducers';

export const endpoint = "https://servus.dictummortuum.com"

const dataProvider = simpleRestProvider(endpoint + '/rest/v1');
// const dataProvider = simpleRestProvider('https://servus.dictummortuum.com/rest/v1');

const App = () => (
  <Admin customReducers={{ atlasReducer }} dataProvider={dataProvider}>
    <Resource name="scrape" list={ScrapedDataList} show={ScrapedDataShow} />
    <Resource name="store" list={StoreList} />
    <Resource name="boardgame" list={BoardgameList} show={BoardgameShow} create={BoardgameCreate} />
    <Resource name="player" list={PlayerList} create={PlayerCreate} />
    <Resource name="play" list={PlayList} create={PlayCreate} />
    <Resource name="stats" list={StatsList} create={StatsCreate} />
  </Admin>
);

export default App;
