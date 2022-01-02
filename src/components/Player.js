import * as React from "react";
import {
  TextField,
  List,
  Datagrid,
  Create,
  SimpleForm,
  TextInput,
} from 'react-admin';

export const PlayerList = props => (
  <List {...props} perPage={25}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="surname" />
    </Datagrid>
  </List>
);

export const PlayerCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="surname" />
    </SimpleForm>
  </Create>
);
