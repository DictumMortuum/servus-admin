// in src/posts.js
// in src/posts.js
import * as React from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed
import { Show, SimpleShowLayout, TextField, DateField, RichTextField } from 'react-admin';

export const PostList = props => (
  <FullCalendar
  plugins={[ dayGridPlugin, interactionPlugin ]}
  initialView="dayGridMonth"
  headerToolbar={{
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,dayGridWeek,dayGridDay'
  }}
  contentHeight={"auto"}
  events={[
    { title: 'event 1', date: '2020-08-13' },
    { title: 'event 2', date: '2020-08-15' },
    { title: 'event 2', date: '2020-08-15' },
    { title: 'event 2', date: '2020-08-15' },
    { title: 'event 2', date: '2020-08-15' },
    { title: 'event 2', date: '2020-08-15' },
    { title: 'event 2', date: '2020-08-15' }
  ]} />
);

export const PostShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="title" />
            <TextField source="teaser" />
            <RichTextField source="body" />
            <DateField label="Publication date" source="created_at" />
        </SimpleShowLayout>
    </Show>
);
