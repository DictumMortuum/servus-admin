import * as React from "react";
import AtlasSearch from './AtlasSearch';
import {
  Show,
  TextField,
  List,
  Datagrid,
  ReferenceField,
  FunctionField,
  Filter,
  ReferenceInput,
  AutocompleteInput,
  ShowButton,
  TabbedShowLayout,
  ReferenceManyField,
  Tab
} from 'react-admin';

export const ScrapedDataShow = (props) => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="summary">
        <AtlasSearch />
      </Tab>
      <Tab label="body" path="body">
        <TextField source="name" />
      </Tab>
      <Tab label="boardgames">
        <ReferenceManyField label="Boardgame" target="id" reference="boardgame">
          <Datagrid>
            <TextField source="name" />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);

const PostFilter = (props) => (
  <Filter {...props}>
    <ReferenceInput label="Boardgame" source="boardgame_id" reference="boardgame">
      <AutocompleteInput
        optionText={choice =>
          `${choice.name}`
        }
      />
    </ReferenceInput>
  </Filter>
);

export const ScrapedDataList = props => (
  <List {...props} filters={<PostFilter />} perPage={25}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="store_id" reference="store">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="boardgame_id" reference="boardgame" link="show">
        <TextField source="name" />
      </ReferenceField>
      <FunctionField label="Title" render={record => (<a href={record.link}>{record.title}</a>)} />
      <ShowButton label="Show" />
    </Datagrid>
  </List>
);

/* <DateField source="cr_date" />
<TextField source="sku" />
<DateField source="active" /> */
