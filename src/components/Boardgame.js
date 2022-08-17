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
import ConfigButton from "./mapping/ConfigButton";
import UnconfigButton from "./mapping/UnconfigButton";
import ButtonGroup from '@mui/material/ButtonGroup';
import { useSelector } from "react-redux";

export const BoardgameShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="data" />
      <TextField source="rank" />
      <TextField source="cost" />
    </SimpleShowLayout>
  </Show>
);

const postFilters = [
  <TextInput label="Name" source="q" defaultValue="" />,
];

export const BoardgameList = props => {
  const { filterBoardgamesWithNoRank } = useSelector(state => state.bggReducer)

  return (
    <List {...props} filter={{ ranked: filterBoardgamesWithNoRank }} filters={postFilters}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="rank" />
        <TextField source="cost" />
        <ImageField source="thumb" />
        <TextField source="data" />
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
      <FormTab label="scoring setup">
        <ImageField source="thumb" />
        <TextField source="name" />
        <ScoreSetupButtons {...props} />
      </FormTab>
    </TabbedForm>
  </Edit>
);

const ScoreSetupButtons = ({ basePath, ...props }) => (
  <ButtonGroup color="primary">
    <ConfigButton {...props} />
    <UnconfigButton {...props} />
  </ButtonGroup>
);

const EditButtons = ({ basePath, ...props }) => (
  <ButtonGroup color="primary">
    <RefetchButton {...props} />
  </ButtonGroup>
);
