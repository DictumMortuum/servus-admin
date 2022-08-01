import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Title } from 'react-admin';

const Request = props => {
  const { request, children, title } = props;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rs, setRs] = useState({});

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
    <Card>
      <Title title={title} />
      <CardContent>
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
