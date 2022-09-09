import React, { useState, useEffect, useCallback, useRef } from 'react';
import Button from '@mui/material/Button';
import { useRecordContext } from 'react-admin';

const Component = props => {
  const { action, name } = props;
  const [isSending, setIsSending] = useState(false);
  const isMounted = useRef(true);
  const { id } = useRecordContext();

  // set isMounted to false when we unmount the component
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  const sendRequest = useCallback(async() => {
    // don't send again while we are sending
    if (isSending) return
    // update state
    setIsSending(true)
    // send the actual request
    await action(id)
    // once the request is sent, update state again
    if (isMounted.current) // only update if we are still mounted
      setIsSending(false)
  }, [isSending, id, action]) // update the callback if the state changes

  return (
    <Button variant="contained" disabled={isSending} onClick={sendRequest}>{name}</Button>
  )
}

export default Component;
