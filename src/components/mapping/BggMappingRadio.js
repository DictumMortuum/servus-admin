import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { makeStyles } from '@mui/styles';
import { useFormContext } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "90%",
  },
}));

const handleChange = (dispatch, setValue) => (event) => {
  const n = parseInt(event.target.value)
  dispatch({
    type: "BGG_SET_MAPPING",
    payload: n
  })

  setValue("boardgame_id", n, { shouldDirty: true });
}

const Component = () => {
  const classes = useStyles();
  const { mappings, current_mapping } = useSelector(state => state.bggReducer)
  const dispatch = useDispatch();
  const { setValue } = useFormContext();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <FormLabel component="legend">Mappings</FormLabel>
      <RadioGroup aria-label="Mappings" name="Mappings" value={current_mapping} onChange={handleChange(dispatch, setValue)}>
        {mappings.map(d => <FormControlLabel key={d.boardgame_id} value={d.boardgame_id} control={<Radio />} label={d.boardgame_id + " - " + d.name} />)}
      </RadioGroup>
    </FormControl>
  )
}

export default Component;
