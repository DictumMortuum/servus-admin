import React, { useState, useEffect, useCallback, useRef } from 'react';
import { endpoint } from '../../App';
import Button from '@mui/material/Button';
import { useRecordContext } from 'react-admin';

const search = id => fetch(endpoint + "/rest/v1/price/" + id + "/unmap", {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
}).then(rs => rs.json())

const Component = props => {
  const [isSending, setIsSending] = useState(false)
  const isMounted = useRef(true)
  // const state = useSelector(state => state.bggReducer)
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
    await search(id)
    // once the request is sent, update state again
    if (isMounted.current) // only update if we are still mounted
      setIsSending(false)
  }, [isSending, id]) // update the callback if the state changes

  return (
    <Button variant="contained" disabled={isSending} onClick={sendRequest}>UNMAP</Button>
  )
}

export default Component;
