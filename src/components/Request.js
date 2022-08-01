import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Title } from 'react-admin';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(3),
  },
  height: {
    height: theme.spacing(100),
  },
}));

const Request = props => {
  const { request, children, title, initialState } = props;
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rs, setRs] = useState(initialState || {});

  useEffect(() => {
    fetch(request)
      .then(res => res.json())
      .then(
        rs => {
          setIsLoaded(true);
          setRs(rs);
        },
        err => {
          setIsLoaded(true);
          setError(err);
        }
      )
  }, [request]);

  return (
    <Card className={classes.margin}>
      <Title title={title} />
      <CardContent className={classes.height}>
        {React.cloneElement(children, {
          data: rs,
          error,
          isLoaded,
        })}
      </CardContent>
    </Card>
  )
}

export default Request;
