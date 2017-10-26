import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { People, Person } from '/imports/relationships/people.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import Topbar from '/imports/topbar.jsx';

import PropTypes from 'prop-types';

class Relationships extends Component {
  createPerson = () => {
    People.insert({ name: 'Untitled Person' });
  };

  renderPeople() {
    return _.map(this.props.people, person => {
      return <Person person={person} key={person._id} />;
    });
  }

  render() {
    return (
      <div className="journal">
        <h1 className="page-title"> ~ How are your Relationships? ~ </h1>
        <Topbar />

        <ul className="journal-entries">{this.renderPeople()}</ul>

        <button
          type="button"
          className="journal-add-btn"
          onClick={this.createPerson}
        >
          <i className="material-icons">add</i>
        </button>
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
