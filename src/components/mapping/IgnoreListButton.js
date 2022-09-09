import React from 'react';
import { endpoint } from '../../App';
import GenericButton from './GenericButton';

const ignore = id => fetch(endpoint + "/rest/v1/price/" + id, {
  method: "PUT",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    ignored: true
  })
}).then(rs => rs.json())

const Component = props => {
  return (
    <GenericButton action={ignore} name="IGNORE" />
  )
}

export default Component;
