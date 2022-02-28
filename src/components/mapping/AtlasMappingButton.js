import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { endpoint } from '../../App';
import Button from '@material-ui/core/Button';

const search = id => fetch(endpoint + "/rest/v1/price/" + id + "/map/atlas", {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
}).then(rs => rs.json())

const Component = props => {
  const [isSending, setIsSending] = useState(false)
  const isMounted = useRef(true)
  const dispatch = useDispatch();
  // const state = useSelector(state => state.bggReducer)

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
    let rs = await search(props.id)

    dispatch({
      type: "ATLAS_SEARCH_RESULTS",
      payload: rs
    })

    // once the request is sent, update state again
    if (isMounted.current) // only update if we are still mounted
      setIsSending(false)
  }, [isSending, props.id, dispatch]) // update the callback if the state changes

  return (
    <Button variant="contained" disabled={isSending} onClick={sendRequest}>ATLAS MAP</Button>
  )
}

export default Component;
