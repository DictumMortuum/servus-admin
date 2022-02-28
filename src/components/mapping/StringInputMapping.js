import React from 'react';
import { useDispatch } from 'react-redux';
import InputBase from '@material-ui/core/InputBase';

const Component = props => {
  const dispatch = useDispatch();

  return <InputBase variant="outlined" onChange={(event) => dispatch({
    type: "SET_TERM",
    payload: event.target.value,
  })} />
}

export default Component;
