import * as React from "react";
import {
  TextField,
  List,
  Datagrid,
  ReferenceField,
  DateField,
  Create,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  DateInput,
} from 'react-admin';

export const PlayList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="boardgame_id" reference="boardgame">
        <TextField source="name" />
      </ReferenceField>
      <DateField source="date" />
    </Datagrid>
  </List>
);

export const PlayCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="boardgame_id" reference="boardgame" perPage={500} sort={{field: "name", order: "DESC"}}>
        <SelectInput optionText="name" optionValue="id" />
      </ReferenceInput>
      <DateInput source="date" />
    </SimpleForm>
  </Create>
);
