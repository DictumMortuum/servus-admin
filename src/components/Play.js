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
  Show,
  TabbedShowLayout,
  Tab,
  ReferenceManyField,
  FunctionField,
} from 'react-admin';

import { JsonInput } from "./Stats";

export const PlayList = props => (
  <List {...props} perPage={25} sort={{ field: 'date', order: 'DESC' }}>
    <Datagrid rowClick="show">
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
      <ReferenceInput source="boardgame_id" reference="boardgame" perPage={500} sort={{field: "name", order: "ASC"}} filter={{ "configured": "1" }}>
        <SelectInput optionText="name" optionValue="id" />
      </ReferenceInput>
      <DateInput source="date" />
    </SimpleForm>
  </Create>
);

export const PlayShow = props => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="summary">
        <ReferenceManyField label="" reference="stats" target="play_id">
          <Datagrid>
            <TextField source="id" />
            <ReferenceField source="play_id" reference="play">
              <DateField source="date" />
            </ReferenceField>
            <ReferenceField source="boardgame_id" reference="boardgame">
              <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="player_id" reference="player">
              <TextField source="name" />
            </ReferenceField>
            <FunctionField render={record => JSON.stringify(record.data, null, 2)} />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
      <Tab label="add stats">
        <CreateStatsForPlay {...props} />
      </Tab>
    </TabbedShowLayout>
  </Show>
)

const CreateStatsForPlay = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="player_id" reference="player" perPage={30}>
        <SelectInput optionText="name" optionValue="id" />
      </ReferenceInput>
      <JsonInput {...props} />
    </SimpleForm>
  </Create>
);
