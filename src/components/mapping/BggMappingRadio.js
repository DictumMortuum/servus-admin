import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-final-form';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "90%",
  },
}));

const handleChange = (dispatch, form) => (event) => {
  const n = parseInt(event.target.value)
  dispatch({
    type: "BGG_SET_MAPPING",
    payload: n
  })

  form.change("boardgame_id", n)
}

const Component = () => {
  const classes = useStyles();
  const { mappings, current_mapping } = useSelector(state => state.bggReducer)
  const dispatch = useDispatch();
  const form = useForm();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <FormLabel component="legend">Mappings</FormLabel>
      <RadioGroup aria-label="Mappings" name="Mappings" value={current_mapping} onChange={handleChange(dispatch, form)}>
        {mappings.map(d => <FormControlLabel key={d.boardgame_id} value={d.boardgame_id} control={<Radio />} label={d.boardgame_id + " - " + d.name} />)}
      </RadioGroup>
    </FormControl>
  )
}

export default Component;
