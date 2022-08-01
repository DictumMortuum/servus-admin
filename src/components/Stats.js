import React, { useEffect } from "react";
import {
  TextField,
  List,
  ReferenceField,
  DateField,
  Datagrid,
  ReferenceInput,
  SimpleForm,
  Create,
  SelectInput,
  useGetOne,
  NumberInput,
  BooleanInput,
} from 'react-admin';
import { useWatch, useFormContext } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import Typography from "@mui/material/Typography";

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
      <ReferenceField source="boardgame_id" reference="boardgame">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="player_id" reference="player">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="data" />
    </Datagrid>
  </List>
);

export const StatsCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="play_id" reference="play" perPage={20}>
        <SelectInput optionText={choice => <SelectText {...choice} />} optionValue="id" />
      </ReferenceInput>
      <ReferenceInput source="boardgame_id" reference="boardgame" perPage={30}>
        <SelectInput optionText="name" optionValue="id" />
      </ReferenceInput>
      <ReferenceInput source="player_id" reference="player" perPage={30}>
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
  const rest = useWatch();
  return <Typography component="pre" className={classes.codeblock}>{JSON.stringify(rest)}</Typography>
}

const JsonInput = props => {
  const { className } = props;
  const play_id = useWatch({ name: "play_id"});
  const { data, isLoading, error } = useGetOne('play', { id: play_id || 1 })

  if (isLoading) {
    return <span>loading {data}...</span>
  }

  if (error) {
    return <span>failed to load {data}...</span>
  }

  return <BoardgameInput className={className} {...data} />
};

const BoardgameInput = ({ className, boardgame_data, boardgame_id }) => {
  const props = { className, boardgame_data };
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue('boardgame_id', boardgame_id)
  }, [boardgame_id, setValue])

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
