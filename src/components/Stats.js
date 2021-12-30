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
import { JsonField } from "react-admin-json-view";
import { useFormState } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  codeblock: {
    fontFamily: "monospace",
    fontSize: "1rem"
  },
});

export const StatsList = props => (
  <List {...props} perPage={25} sort={{ field: 'id', order: 'DESC' }}>
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

const SelectText = props => (
  <span>{dateFormatter(new Date(props.date)) + " - " + props.boardgame}</span>
)

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

const BoardgameInput = ({ className, boardgame_data, boardgame_id }) => {
  const props = { className, boardgame_data };

  if (boardgame_data.hasOwnProperty("cooperative")) {
    return <CooperativeInput {...props} />
  }

  if (boardgame_data.hasOwnProperty("columns")) {
    return <DatabaseInput {...props} />
  }

  switch (boardgame_id) {
    default:
      return <NumberInput source="score" {...props} />
  }
}

const DatabaseInput = props => (
  <div {...props}>
    {props.boardgame_data.columns.map(d => {
      const { type, name } = d;

      switch (type) {
        case "int":
          return <NumberInput key={name} source={name} {...props} />
        case "bool":
          return <BooleanInput key={name} source={name} {...props} />
        default:
          return <span>not supported</span>
      }
    })}
  </div>
)

const CooperativeInput = props => (
  <BooleanInput source="won" {...props} />
)
