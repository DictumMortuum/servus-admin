import * as React from "react";
import {
  TextField,
  List,
  ReferenceField,
  DateField,
  Datagrid,
  ReferenceFieldController,
  FunctionField,
  ReferenceInput,
  SimpleForm,
  Create,
  TextInput,
  SelectInput,
} from 'react-admin';
import { endpoint } from '../App';

async function getPlayers() {
  const rs = await fetch(endpoint + "/rest/v1/player")
  return rs.json()
}

async function getBoardgames() {
  const rs = await fetch(endpoint + "/rest/v1/boardgame")
  return rs.json()
}

async function getScores() {
  const rs = await fetch(endpoint + "/boardgames/scores")
  return rs.json()
}

const mapIdToPlayer = players => ({ player_id }) => players.filter(d => d.id === player_id)[0].name
const mapIdToBoardgame = boardgames => ({ boardgame_id }) => boardgames.filter(d => d.id === boardgame_id)[0].name

const parseScore = boardgames => players => score => {
  const boardgame = mapIdToBoardgame(boardgames)(score.play)
  const stats = score.stats.reverse().map(d => {
    const player = mapIdToPlayer(players)(d)
    return {
      ...d,
      player
    }
  })

  return {
    play: {
      ...score.play,
      boardgame
    },
    stats
  }
}

const exporter = async () => {
  let players = await getPlayers()
  let games = await getBoardgames()
  let scores = await getScores()
  let retval = JSON.stringify(scores.response.map(parseScore(games)(players)))
  const fileName = "file";
  const blob = new Blob([retval],{type:'application/json'});
  const href = await URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = fileName + ".json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const StatsList = props => (
  <List {...props} exporter={exporter} >
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="play_id" reference="play">
        <DateField source="date" />
      </ReferenceField>
      <ReferenceFieldController label="title" source="play_id" reference="play" linkType={false}>
        {({referenceRecord, ...props}) => (
          <ReferenceField reference="boardgame" source="boardgame_id" record={referenceRecord || {}} linkType="show">
            <TextField source="name" />
          </ReferenceField>
        )}
      </ReferenceFieldController>
      <ReferenceField source="player_id" reference="player">
        <TextField source="name" />
      </ReferenceField>
      <FunctionField label="Data" render={record => (<p>{JSON.stringify(record.data)}</p>)} />
    </Datagrid>
  </List>
);

export const StatsCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="play_id" reference="play">
        <SelectInput optionText={choice => choice.id + " - " + choice.date} optionValue="id" />
      </ReferenceInput>
      <ReferenceInput source="player_id" reference="player">
        <SelectInput optionText="name" optionValue="id" />
      </ReferenceInput>
      <TextInput multiline source="data" />
    </SimpleForm>
  </Create>
);
