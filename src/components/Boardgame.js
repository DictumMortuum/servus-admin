import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  List,
  Datagrid,
  ShowButton,
  Create,
  SimpleForm,
  NumberInput,
  TextInput,
} from 'react-admin';

export const BoardgameShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
    </SimpleShowLayout>
  </Show>
);

export const BoardgameList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <ShowButton label="Show" />
    </Datagrid>
  </List>
);

export const BoardgameCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <NumberInput source="id" />
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);
