import * as React from "react";
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-json-server';
import { BoardgameShow, BoardgameList, BoardgameCreate } from './components/Boardgame';
import { StoreList } from './components/Store';
import { PlayerList, PlayerCreate } from './components/Player';
import { PlayList, PlayCreate } from './components/Play';
import { StatsList, StatsCreate } from './components/Stats';
import { PriceList, PriceShow, PriceEdit } from './components/Prices';
import { atlasReducer, bggReducer } from './components/reducers';
import StoreIcon from '@material-ui/icons/Store';
import ExtensionIcon from '@material-ui/icons/Extension';
import PersonIcon from '@material-ui/icons/Person';
import EventIcon from '@material-ui/icons/Event';
import EventNoteIcon from '@material-ui/icons/EventNote';

export const endpoint = "https://servus.dictummortuum.com"
// export const endpoint = "http://127.0.0.1:1234"
const dataProvider = simpleRestProvider(endpoint + '/rest/v1');

const cacheDataProviderProxy = (dataProvider, duration = 5 * 60 * 1000) => new Proxy(dataProvider, {
  get: (target, name) => (resource, params) => {
    if (name === 'getOne') {
      return dataProvider[name](resource, params).then(response => {
        const validUntil = new Date();
        validUntil.setTime(validUntil.getTime() + duration);
        response.validUntil = validUntil;
        return response;
      });
    }
    return dataProvider[name](resource, params);
  },
});

const App = () => (
  <Admin customReducers={{ atlasReducer, bggReducer }} dataProvider={cacheDataProviderProxy(dataProvider)}>
    <Resource name="store" list={StoreList} icon={StoreIcon} />
    <Resource name="boardgame" list={BoardgameList} show={BoardgameShow} create={BoardgameCreate} icon={ExtensionIcon} />
    <Resource name="player" list={PlayerList} create={PlayerCreate} icon={PersonIcon} />
    <Resource name="play" list={PlayList} create={PlayCreate} icon={EventIcon} />
    <Resource name="stats" list={StatsList} create={StatsCreate} icon={EventNoteIcon} />
    <Resource name="price" list={PriceList} show={PriceShow} edit={PriceEdit} />
  </Admin>
);

export default App;
