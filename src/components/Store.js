import * as React from "react";
import {
  TextField,
  List,
  Datagrid
} from 'react-admin';

export const StoreList = props => (
  <List {...props}>
      <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="name" />
      </Datagrid>
  </List>
);
