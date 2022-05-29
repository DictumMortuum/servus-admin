import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { endpoint } from '../../App';
import Button from '@material-ui/core/Button';
import { useRefresh, useNotify } from 'react-admin';

const search = id => fetch(endpoint + "/rest/v1/price/" + id + "/map/bgg", {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
}).then(rs => rs.json())

const update = (id, boardgame_id) => fetch(endpoint + "/rest/v1/price/" + id, {
  method: "PUT",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    boardgame_id
  })
}).then(rs => rs.json())

const Component = props => {
  const { id } = props.record;
  const [isSending, setIsSending] = useState(false)
  const isMounted = useRef(true)
  const dispatch = useDispatch();
  const refresh = useRefresh();
  const notify = useNotify();
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
    let rs = await search(id)

    dispatch({
      type: "BGG_SEARCH_RESULTS",
      payload: rs
    })

    if (rs.length > 0) {
      const { boardgame_id } = rs[0];
      await update(id, boardgame_id);
      refresh();
      notify(`${id} was updated to ${boardgame_id}`,  { type: 'success' })
    } else {
      notify(`${id} has ${rs.length} results`, { type: 'warning' })
    }

    // once the request is sent, update state again
    if (isMounted.current) // only update if we are still mounted
      setIsSending(false)
  }, [isSending, dispatch, notify, refresh, id]) // update the callback if the state changes

  return (
    <Button variant="contained" disabled={isSending} onClick={sendRequest}>BGG</Button>
  )
}

export default Component;
