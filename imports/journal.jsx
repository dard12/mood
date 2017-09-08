import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Entries, Entry } from '/imports/entries.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

class Journal extends Component {
  renderEntries() {
    return _.map(this.props.entries, entry => {
      return <Entry entry={entry} key={entry._id} />;
    });
  }

  render() {
    return (
      <div className="journal">
        <ul className="journal-entries">{this.renderEntries()}</ul>

        <Link className="journal-add-btn" to="/record-mood">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

Journal.defaultProps = {
  entries: [],
};

Journal.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.object),
};

export default createContainer(() => {
  Meteor.subscribe('entries.journal');

  return {
    entries: Entries.find({}).fetch(),
  };
}, Journal);
