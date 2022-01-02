import * as React from "react";
import {
  TextField,
  List,
  Datagrid,
  BooleanField,
  UrlField,
  ReferenceField
} from 'react-admin';

export const PriceList = props => (
  <List perPage={25} {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="store_id" reference="store">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="boardgame_id" reference="boardgame">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="name" />
      <TextField source="price" />
      <BooleanField source="stock" />
      <UrlField source="url" />
      <TextField source="rank" />
      <TextField source="distance" />
    </Datagrid>
  </List>
);
