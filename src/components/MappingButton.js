import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { showNotification } from 'react-admin';
import { mapScrapedDataToSearch } from './api';

class MappingButton extends Component {
  handleClick = () => {
    const { record, row, showNotification } = this.props;

    mapScrapedDataToSearch(record, row)
      .then(() => {
        showNotification("Mapping successful")
      })
      .catch((e) => {
        showNotification("Error: mapping" + e, "warning")
      })
  }

  render() {
    const { row, record } = this.props;

    return (
      <Button variant="contained" color={row.id === record.boardgame_id ? "primary" : "default"} onClick={this.handleClick}>{row.id}</Button>
    );
  }
}

MappingButton.propTypes = {
  record: PropTypes.object,
  showNotification: PropTypes.func,
};

export default connect(null, {
  showNotification,
})(MappingButton);
