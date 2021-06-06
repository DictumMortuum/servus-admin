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

export const StatsList = props => (
  <List {...props}>
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
