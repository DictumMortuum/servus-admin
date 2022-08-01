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
  TextInput
} from 'react-admin';
import { useWatch, useFormContext } from 'react-hook-form';

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

const transform = props => {
  const { boardgame_id, player_id, play_id, data } = props;

  return {
    boardgame_id,
    player_id,
    play_id,
    data,
  }
}

export const StatsCreate = props => (
  <Create {...props} transform={transform}>
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
  const { boardgame_data: { columns }} = props;
  const column_names = columns.map(d => d.name);
  const rest = useWatch();
  const obj = {};
  const { setValue } = useFormContext();

  Object.keys(rest).map(d => {
    if (column_names.includes(d)) {
      obj[d] = rest[d];
    }
    return d;
  });

  const data = JSON.stringify(obj, null, 2);

  useEffect(() => {
    setValue('data', data);
  }, [data, setValue]);

  return (
    <React.Fragment>
      <TextInput source="data" multiline />
    </React.Fragment>
  )
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

  return (
    <React.Fragment>
      <BoardgameInput className={className} {...data} />
      <OutputField {...data} />
    </React.Fragment>
  )
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
  <React.Fragment>
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
  </React.Fragment>
)

const CooperativeInput = props => (
  <BooleanInput source="won" {...props} />
)
