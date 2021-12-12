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
import { JsonField } from "react-admin-json-view";

export const BoardgameShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <JsonField source="data" />
    </SimpleShowLayout>
  </Show>
);

export const BoardgameList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <JsonField source="data" reactJsonOptions={{collapsed: true}} />
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
