import * as React from "react";
import {
  TextField,
  List,
  Datagrid,
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceField,
} from 'react-admin';

export const MappingList = props => (
  <List {...props} perPage={25}>
    <Datagrid rowClick="create">
      <TextField source="id" />
      <ReferenceField source="boardgame_id" reference="boardgame">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="name" />
    </Datagrid>
  </List>
);

export const MappingCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <NumberInput source="boardgame_id" />
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);
