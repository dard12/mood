import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { People, Person } from '/imports/relationships/people.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import Topbar from '/imports/topbar.jsx';

import PropTypes from 'prop-types';

class Relationships extends Component {
  renderPeople() {
    return _.map(this.props.people, person => {
      return <Person person={person} key={person._id} />;
    });
  }

  render() {
    return (
      <div className="journal">
        <h1 className="page-title"> ~ How do you Feel? ~ </h1>
        <Topbar />

        <ul className="journal-entries">{this.renderPeople()}</ul>

        <Link className="journal-add-btn" to="/record">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

Relationships.defaultProps = {
  people: [],
};

Relationships.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object),
};

export default createContainer(() => {
  Meteor.subscribe('people');

  return {
    people: People.find().fetch(),
  };
}, Relationships);
