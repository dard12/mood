import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mongo } from 'meteor/mongo';

class PeopleCollection extends Mongo.Collection {
  insert(entry = {}) {
    entry.createdAt = new Date();
    super.insert(entry);
  }
}

export const People = new PeopleCollection('people');

export class Person extends Component {
  state = { editing: false };

  render() {
    return <div> {this.props.person.name} </div>;
  }
}

Person.propTypes = {
  person: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
  }).isRequired,
};
