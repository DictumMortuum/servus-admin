import * as React from "react";
import { List, Datagrid, TextField, DateField } from 'react-admin';

const postRowStyle = (record, index) => {
  let background = 'white'

  if (record.shift === -1) {
    background = '#d4edda'
  } else if (record.shift < -1) {
    background = '#fff3cd'
  } else if (record.shift === 23) {
    background = '#cce5ff'
  } else if (record.shift === 3) {
    background = '#f8d7da'
  } else {
    background = 'white'
  }

  return {
    backgroundColor: background
  }
}

export const CalendarList = props => (
  <List {...props} sort={{ field: "date", order: "ASC" }} perPage={25} >
    <Datagrid rowClick="edit" sortBy="date" rowStyle={postRowStyle}>
      <DateField source="date" locales="el-GR" options={{ year: 'numeric', month: 'numeric', day: 'numeric' }}  />
      <DateField label="Day" source="date" locales="el-GR" options={{ weekday: 'long' }}  />
      <TextField source="summary" />
      <TextField source="description" />
    </Datagrid>
  </List>
);
