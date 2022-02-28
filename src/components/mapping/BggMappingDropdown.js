import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-final-form';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "90%",
  },
}));

const Component = () => {
  const classes = useStyles();
  const { mappings, current_mapping } = useSelector(state => state.bggReducer)
  const dispatch = useDispatch();
  const form = useForm();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="bgg-select-label"></InputLabel>
      <Select
        labelId="bgg-select-label"
        id="bgg-select"
        value={current_mapping}
        onChange={(event) => {
          dispatch({
            type: "BGG_SET_MAPPING",
            payload: event.target.value
          })

          form.change("boardgame_id", event.target.value)
        }}
      >
        <MenuItem key={-1} value={-1}>None</MenuItem>
        {mappings.map(d => <MenuItem key={d.boardgame_id} value={d.boardgame_id}>{d.boardgame_id} - {d.name}</MenuItem>)}
      </Select>
    </FormControl>
  )
}

export default Component;
