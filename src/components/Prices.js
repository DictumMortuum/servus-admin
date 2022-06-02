import * as React from "react";
import { Fragment } from 'react';
import {
  TextField,
  List,
  Datagrid,
  UrlField,
  ReferenceField,
  TabbedShowLayout,
  TabbedForm,
  Tab,
  FormTab,
  Show,
  Edit,
  NumberInput,
  BulkDeleteButton,
  BooleanInput,
  EditButton,
  ImageField,
} from 'react-admin';
import BggMappingButton from "./mapping/BggMappingButton";
import BggMappingListButton from "./mapping/BggMappingListButton";
import BggMappingRadio from "./mapping/BggMappingRadio";
import AtlasMappingButton from "./mapping/AtlasMappingButton";
import AtlasMappingStringButton from "./mapping/AtlasMappingStringButton";
import StringInputMapping from "./mapping/StringInputMapping";
import OutsideOfScopeButton from "./mapping/OutsideOfScopeButton";
import BulkIgnoreButton from "./mapping/BulkIgnoreButton";
import IgnoreButton from "./mapping/IgnoreButton";
import UnmapButton from "./mapping/UnmapButton";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useSelector } from "react-redux";

const PostBulkActionButtons = props => (
  <Fragment>
    <BulkIgnoreButton label="Ignore Items" {...props} />
    <BulkDeleteButton {...props} />
  </Fragment>
);

export const PriceList = props => {
  const { filterMappedPrices } = useSelector(state => state.bggReducer)

  return (
    <List perPage={10} {...props} filter={{ mapped: filterMappedPrices }} bulkActionButtons={<PostBulkActionButtons />}>
      <Datagrid>
        <TextField source="id" />
        <ImageField source="store_thumb" />
        <ReferenceField source="store_id" reference="store">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="boardgame_id" reference="boardgame">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="name" />
        <TextField source="transformed_name" />
        <TextField source="price" />
        <TextField source="stock" />
        <UrlField source="url" />
        <BggMappingListButton />
        <EditButton />
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
    <IgnoreButton {...props} />
    <OutsideOfScopeButton {...props} />
  </ButtonGroup>
)

export const PriceEdit = props => (
  <Edit {...props}>
    <TabbedForm>
      <FormTab label="mapping">
        <TextField source="name" />
        <BooleanInput source="mapped" />
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
