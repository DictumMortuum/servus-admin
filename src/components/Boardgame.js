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
  ImageField,
  Edit,
  TabbedForm,
  FormTab,
} from 'react-admin';
import RefetchButton from "./mapping/RefetchButton";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { JsonField } from "react-admin-json-view";
import { useSelector } from "react-redux";

export const BoardgameShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <JsonField source="data" />
      <TextField source="rank" />
      <TextField source="cost" />
    </SimpleShowLayout>
  </Show>
);

export const BoardgameList = props => {
  const { filterBoardgamesWithNoRank } = useSelector(state => state.bggReducer)

  return (
    <List {...props} filter={{ ranked: filterBoardgamesWithNoRank }}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="rank" />
        <TextField source="cost" />
        <ImageField source="thumb" />
        <JsonField source="data" reactJsonOptions={{collapsed: true}} />
        <ShowButton label="Show" />
      </Datagrid>
    </List>
  );
}

export const BoardgameCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <NumberInput source="id" />
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);

export const BoardgameEdit = props => (
  <Edit {...props}>
    <TabbedForm>
      <FormTab label="mapping">
        <ImageField source="thumb" />
        <TextField source="name" />
        <EditButtons {...props} />
      </FormTab>
    </TabbedForm>
  </Edit>
)

const EditButtons = ({ basePath, ...props }) => (
  <ButtonGroup color="primary">
    <RefetchButton {...props} />
  </ButtonGroup>
)
