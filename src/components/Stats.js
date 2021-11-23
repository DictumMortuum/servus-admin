import * as React from "react";
import {
  TextField,
  List,
  ReferenceField,
  DateField,
  Datagrid,
  ReferenceFieldController,
  ReferenceInput,
  SimpleForm,
  Create,
  SelectInput,
  useQueryWithStore,
  NumberInput,
  BooleanInput,
  Toolbar,
  SaveButton
} from 'react-admin';
import { endpoint } from '../App';
import { JsonField } from "react-admin-json-view";
import { useFormState } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  codeblock: {
    fontFamily: "monospace",
    fontSize: "1rem"
  },
});

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
  let retval = JSON.stringify(scores.response.map(parseScore(games)(players)), null, 2)
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
  <List {...props} exporter={exporter} perPage={25} sort={{ field: 'id', order: 'DESC' }}>
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
      {/* <FunctionField label="Data" render={record => (<p>{JSON.stringify(record.data)}</p>)} /> */}
      <JsonField
        source="data"
        reactJsonOptions={{
          name: null,
          collapsed: true,
          enableClipboard: false,
          displayDataTypes: false,
        }}
      />
    </Datagrid>
  </List>
);

const PostCreateToolbar = props => (
  <Toolbar {...props}>
    <SaveButton
      label="save"
      transform={data => {
        const { data: _, play_id, player_id, ...rest } = data
        return {
          play_id,
          player_id,
          data: JSON.stringify(rest)
        }
      }}
      submitOnEnter={false}
    />
  </Toolbar>
);

export const StatsCreate = props => (
  <Create {...props}>
    <SimpleForm toolbar={<PostCreateToolbar />}>
      <ReferenceInput source="play_id" reference="play" perPage={20}>
        <SelectInput optionText={choice => <SelectText {...choice} />} optionValue="id" />
      </ReferenceInput>
      <ReferenceInput source="player_id" reference="player">
        <SelectInput optionText="name" optionValue="id" />
      </ReferenceInput>
      <JsonInput {...props} />
      <OutputField {...props} />
    </SimpleForm>
  </Create>
);

const dateFormatter = v => {
  if (!(v instanceof Date) || isNaN(v)) return;
  const pad = '00';
  const yy = v.getFullYear().toString();
  const mm = (v.getMonth() + 1).toString();
  const dd = v.getDate().toString();
  return `${yy}-${(pad + mm).slice(-2)}-${(pad + dd).slice(-2)}`;
};

const SelectText = props => {
  const { loaded, error, data } = useQueryWithStore({
    type: 'getOne',
    resource: 'boardgame',
    payload: { id: props.boardgame_id }
  })

  if (!loaded) {
    return <span>loading {props.boardgame_id}...</span>
  }

  if (error) {
    return <span>failed to load {props.boardgame_id}...</span>
  }

  return <span>{dateFormatter(new Date(props.date)) + " - " + data.name}</span>
}

const OutputField = props => {
  const classes = useStyles();
  const { values } = useFormState();
  const { data: _, play_id, player_id, ...rest } = values
  return <div className={classes.codeblock}>{JSON.stringify(rest)}</div>
}

const JsonInput = props => {
  const { className } = props;
  const { values } = useFormState();
  const { loaded, error, data } = useQueryWithStore({
    type: 'getOne',
    resource: 'play',
    payload: { id: values.play_id || 1 }
  })

  if (!loaded) {
    return <span>loading {data}...</span>
  }

  if (error) {
    return <span>failed to load {data}...</span>
  }

  return <BoardgameInput className={className} {...data} />
};

const BoardgameInput = ({ className, boardgame_id }) => {
  const props = { className };

  switch (boardgame_id) {
    case 266810:
      return <PaladinsOfTheWestKingdomInput {...props} />
    case 173346:
      return <SevenWondersDuelInput {...props} />
    case 164928:
      return <OrleansInput {...props} />
    case 296151:
      return <ViscountsInput {...props} />
    case 193738:
      return <GreatWesternTrailInput {...props} />
    case 312484:
      return <LostRuinsOfArnakInput {...props} />
    case 216132:
      return <ClansOfCaledoniaInput {...props} />
    case 236457:
      return <ArchitectsInput {...props} />
    case 266192:
      return <WingspanInput {...props} />
    case 256916:
      return <ConcordiaInput {...props} />
    case 253499:
      return <WarOfWhispersInput {...props} />
    default:
      return <NumberInput source="score" {...props} />
  }
}

const WarOfWhispersInput = props => (
  <div {...props} >
    <NumberInput source="score" {...props} />
    <NumberInput source="swaps" {...props} />
  </div>
)

const SevenWondersDuelInput = props => (
  <div {...props} >
    <NumberInput source="battle_points" label="Battle Points" {...props} />
    <NumberInput source="blue_points" label="Blue Points" {...props} />
    <NumberInput source="coin_points" label="Coin" {...props} />
    <NumberInput source="green_points" label="Green Points" {...props} />
    <NumberInput source="marker_points" label="Market Points" {...props} />
    <NumberInput source="pantheon_points" label="Pantheon Points" {...props} />
    <NumberInput source="purple_points" label="Purple Points" {...props} />
    <NumberInput source="yellow_points" label="Yellow Points" {...props} />
    <NumberInput source="wonder_points" label="Wonder Points" {...props} />
    <BooleanInput source="battle_victory" label="Battle Victory" {...props} />
    <BooleanInput source="science_victory" label="Science Victory" {...props} />
  </div>
)

const PaladinsOfTheWestKingdomInput = props => (
  <div {...props}>
    <NumberInput source="order" label="King's orders" {...props} />
    <NumberInput source="black" label="Black track" {...props} />
    <NumberInput source="blue" label="Blue track" {...props} />
    <NumberInput source="red" label="Red track" {...props} />
    <NumberInput source="develop" {...props} />
    <NumberInput source="debt" {...props} />
    <NumberInput source="coin" label="Silver/Provisions" {...props} />
    <NumberInput source="commission" {...props} />
    <NumberInput source="fortify" {...props} />
    <NumberInput source="garrison" {...props} />
    <NumberInput source="absolve" {...props} />
    <NumberInput source="convert" {...props} />
  </div>
)

const OrleansInput = props => (
  <div {...props}>
    <NumberInput source="buildings" {...props} />
    <NumberInput source="citizen" {...props} />
    <NumberInput source="coin" {...props} />
    <NumberInput source="grain" {...props} />
    <NumberInput source="cheese" {...props} />
    <NumberInput source="wine" {...props} />
    <NumberInput source="brocade" {...props} />
    <NumberInput source="wool" {...props} />
    <NumberInput source="orders" {...props} />
    <NumberInput source="tiles" {...props} />
  </div>
)

const ViscountsInput = props => (
  <div {...props}>
    <NumberInput source="build" {...props} />
    <NumberInput source="castle" {...props} />
    <NumberInput source="castle_leader" {...props} />
    <NumberInput source="deeds" {...props} />
    <NumberInput source="dept" {...props} />
    <NumberInput source="poverty" {...props} />
    <NumberInput source="transcribe" {...props} />
  </div>
)

const GreatWesternTrailInput = props => (
  <div {...props}>
    <NumberInput source="dollars" {...props} />
    <NumberInput source="buildings" {...props} />
    <NumberInput source="cities" {...props} />
    <NumberInput source="stations" {...props} />
    <NumberInput source="hazards" {...props} />
    <NumberInput source="cards" {...props} />
    <NumberInput source="objectives" {...props} />
    <NumberInput source="tasks" {...props} />
    <NumberInput source="workers" {...props} />
    <NumberInput source="disk" {...props} />
    <NumberInput source="market" {...props} />
  </div>
)

const LostRuinsOfArnakInput = props => (
  <div {...props}>
    <NumberInput source="cards" {...props} />
    <NumberInput source="fear" {...props} />
    <NumberInput source="guardian" {...props} />
    <NumberInput source="idols" {...props} />
    <NumberInput source="research" {...props} />
    <NumberInput source="tiles" {...props} />
  </div>
)

const ClansOfCaledoniaInput = props => (
  <div {...props}>
    <NumberInput source="bamboo" {...props} />
    <NumberInput source="bananas" {...props} />
    <NumberInput source="base" {...props} />
    <NumberInput source="coin" {...props} />
    <NumberInput source="cotton" {...props} />
    <NumberInput source="exports" {...props} />
    <NumberInput source="grape" {...props} />
    <NumberInput source="manufactured" {...props} />
    <NumberInput source="points" {...props} />
    <NumberInput source="settlement" {...props} />
  </div>
)

const ArchitectsInput = props => (
  <div {...props}>
    <NumberInput source="buildings" {...props} />
    <NumberInput source="cathedral" {...props} />
    <NumberInput source="debt" {...props} />
    <NumberInput source="gold-marble" {...props} />
    <NumberInput source="money" {...props} />
    <NumberInput source="prison" {...props} />
    <NumberInput source="virtue" {...props} />
  </div>
)

const WingspanInput = props => (
  <div {...props}>
    <NumberInput source="birds" {...props} />
    <NumberInput source="bonus" {...props} />
    <NumberInput source="eggs" {...props} />
    <NumberInput source="endofround" {...props} />
    <NumberInput source="food" {...props} />
    <NumberInput source="nectar" {...props} />
    <NumberInput source="tucked" {...props} />
  </div>
)

const ConcordiaInput = props => (
  <div {...props}>
    <NumberInput source="concordia" {...props} />
    <NumberInput source="jupiter" {...props} />
    <NumberInput source="mars" {...props} />
    <NumberInput source="mercurius" {...props} />
    <NumberInput source="minerva" {...props} />
    <NumberInput source="saturnus" {...props} />
    <NumberInput source="venus" {...props} />
    <NumberInput source="vesta" {...props} />
  </div>
)
