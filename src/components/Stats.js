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
  NumberInput,
  BooleanInput,
  TextInput,
  useDataProvider,
  FunctionField
} from 'react-admin';
import { useWatch, useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';

export const StatsList = props => (
  <List {...props} perPage={25} sort={{ field: 'id', order: 'DESC' }}>
    <Datagrid
      rowClick="edit"
      isRowExpandable={() => true}
      expand={<FunctionField render={record => JSON.stringify(record.data, null, 2)} />}
    >
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
      <ReferenceInput source="player_id" reference="player" perPage={35}>
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

export const JsonInput = props => {
  const { className } = props;
  const play_id = useWatch({ name: "play_id"});
  const dataProvider = useDataProvider();
  const { data, isLoading, error } = useQuery(
    ['play', 'getOne', { id: play_id || 418 }],
    () => dataProvider.getOne('play', { id: play_id || 418 })
  );

  if (isLoading) {
    return <span>loading {data}...</span>
  }

  if (error) {
    return <span>failed to load {data}...</span>
  }

  return (
    <BoardgameInput className={className} {...data.data} />
  )
};

const BoardgameInput = ({ className, boardgame_data, boardgame_id }) => {
  const props = { className, boardgame_data };
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue('boardgame_id', boardgame_id)
  }, [boardgame_id, setValue])

  if (boardgame_data.hasOwnProperty("cooperative")) {
    return (
      <React.Fragment>
        <BooleanInput source="won" {...props} />
        <OutputField {...props} columns={[{ name: "won" }]} />
      </React.Fragment>
    )
  }

  if (boardgame_data.hasOwnProperty("columns")) {
    const { columns } = boardgame_data;

    return (
      <React.Fragment>
        {columns.map(d => <DatabaseInput key={d.name} type={d.type} name={d.name} />)}
        <OutputField {...props} columns={columns} />
      </React.Fragment>
    )
  }

  switch (boardgame_id) {
    default:
      return <NumberInput source="score" {...props} />
  }
}

const OutputField = props => {
  const { columns } = props;
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
    <TextInput source="data" multiline />
  )
}

const DatabaseInput = props => {
  const { type, name } = props;

  switch (type) {
    case "int":
      return <NumberInput source={name} {...props} />
    case "bool":
      return <BooleanInput source={name} {...props} />
    default:
      return <span>not supported</span>
  }
}
