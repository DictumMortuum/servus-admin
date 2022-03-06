import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';

const Component = props => {
  const [isSending, setIsSending] = useState(false)
  const isMounted = useRef(true)
  const dispatch = useDispatch();

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

    dispatch({
      type: "ATLAS_SEARCH_RESULTS",
      payload: []
    })

    // once the request is sent, update state again
    if (isMounted.current) // only update if we are still mounted
      setIsSending(false)
  }, [isSending, dispatch]) // update the callback if the state changes

  return (
    <Button variant="contained" disabled={isSending} onClick={sendRequest}>OUSIDE OF SCOPE</Button>
  )
}

export default Component;
