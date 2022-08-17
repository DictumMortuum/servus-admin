import * as React from "react";
import { Admin, Resource, CustomRoutes } from 'react-admin';
import simpleRestProvider from 'ra-data-json-server';
import { BoardgameShow, BoardgameList, BoardgameCreate, BoardgameEdit } from './components/Boardgame';
import { StoreList } from './components/Store';
import { PlayerList, PlayerCreate } from './components/Player';
import { PlayList, PlayCreate, PlayShow } from './components/Play';
import { StatsList, StatsCreate } from './components/Stats';
import { PriceList, PriceShow, PriceEdit } from './components/Prices';
import { MappingList, MappingCreate } from "./components/Mapping";
import { atlasReducer, bggReducer } from './components/reducers';
import { Route } from "react-router-dom";
import StoreIcon from '@mui/icons-material/Store';
import ExtensionIcon from '@mui/icons-material/Extension';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Dashboard from "./components/Dashboard";
import GamesExpenses from "./components/graphs/GamesExpenses";
import Income from "./components/graphs/Income";
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

export const endpoint = process.env.REACT_APP_URL;
const dataProvider = simpleRestProvider(`${endpoint}/rest/v1`);

const App = () => (
  <Provider store={createStore(combineReducers({ atlasReducer, bggReducer}))}>
    <Admin dashboard={Dashboard}dataProvider={dataProvider}>
      <Resource name="store" list={StoreList} icon={StoreIcon} />
      <Resource name="boardgame" list={BoardgameList} show={BoardgameShow} create={BoardgameCreate} edit={BoardgameEdit} icon={ExtensionIcon} />
      <Resource name="player" list={PlayerList} create={PlayerCreate} icon={PersonIcon} />
      <Resource name="play" list={PlayList} create={PlayCreate} show={PlayShow} icon={EventIcon} />
      <Resource name="stats" list={StatsList} create={StatsCreate} icon={EventNoteIcon} />
      <Resource name="price" list={PriceList} show={PriceShow} edit={PriceEdit} />
      <Resource name="mapping" list={MappingList} create={MappingCreate} />
      <CustomRoutes>
        <Route path="/expense/games" element={<GamesExpenses />} />
        <Route path="/income" element={<Income />} />
      </CustomRoutes>
    </Admin>
  </Provider>
);

export default App;
