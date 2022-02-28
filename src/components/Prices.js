import * as React from "react";
import {
  TextField,
  List,
  Datagrid,
  BooleanField,
  UrlField,
  ReferenceField,
  TabbedShowLayout,
  TabbedForm,
  Tab,
  FormTab,
  Show,
  Edit,
  NumberInput,
} from 'react-admin';
import BggMappingButton from "./mapping/BggMappingButton";
import BggMappingRadio from "./mapping/BggMappingRadio";
import AtlasMappingButton from "./mapping/AtlasMappingButton";
import AtlasMappingStringButton from "./mapping/AtlasMappingStringButton";
import StringInputMapping from "./mapping/StringInputMapping";
import UnmapButton from "./mapping/UnmapButton";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useSelector } from "react-redux";

export const PriceList = props => {
  const { filterMappedPrices } = useSelector(state => state.bggReducer)

  return (
    <List perPage={10} {...props} filter={{ mapped: filterMappedPrices }}>
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
}

const EditButtons = ({ basePath, ...props }) => (
  <ButtonGroup color="primary">
    <BggMappingButton {...props} />
    <AtlasMappingButton {...props} />
    <StringInputMapping />
    <AtlasMappingStringButton {...props} />
    <UnmapButton {...props} />
  </ButtonGroup>
)

export const PriceEdit = props => (
  <Edit {...props}>
    <TabbedForm>
      <FormTab label="mapping">
        <TextField source="name" />
        <NumberInput source="boardgame_id" />
        <EditButtons {...props} />
        <BggMappingRadio />
      </FormTab>
    </TabbedForm>
  </Edit>
)

export const PriceShow = props => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="mapping">
        <TextField label="Id" source="id" />
        <TextField source="name" />
        <TextField source="price" />
      </Tab>
      <Tab label="map" path="body">
        <TextField source="name" addLabel={false} />
      </Tab>
    </TabbedShowLayout>
  </Show>
);
