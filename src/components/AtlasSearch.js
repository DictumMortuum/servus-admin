import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showNotification } from 'react-admin';
import { bggSearch } from './api';
import { atlasSearchReceived as atlasSearchReceivedAction } from './actions';
import MappingButton from './MappingButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class AtlasSearch extends Component {
  componentDidMount = () => {
    const { record, showNotification, atlasSearchReceived } = this.props;

    bggSearch(record.title)
      .then(atlasSearchReceived)
      .then(() => {
        showNotification("Atlas query successful")
      })
      .catch((e) => {
        showNotification("Error: atlas" + e, "warning")
      })
  }

  render() {
    const { atlas, record, state } = this.props;

    console.log(state)

    return (
      <div>
        <h3>{record.title}</h3>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>thumb</TableCell>
                <TableCell>name</TableCell>
                <TableCell>id</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {atlas.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>
                    <img style={{height: 200}} alt="" src={row.thumb} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>
                    <MappingButton row={row} record={record} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

AtlasSearch.propTypes = {
  record: PropTypes.object,
  showNotification: PropTypes.func,
  atlasSearchReceived: PropTypes.func,
  atlas: PropTypes.array,
};

const mapStateToProps = state => ({ atlas: state.atlasReducer, state });

export default connect(mapStateToProps, {
  showNotification,
  atlasSearchReceived: atlasSearchReceivedAction,
})(AtlasSearch);
