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

  removePerson = () => {
    People.remove({ _id: this.props.person._id });
  };

  editPerson = () => {
    this.setState({ editing: !this.state.editing });
  };

  render() {
    return (
      <li className="entry">
        <h1 className="entry-title">{this.props.person.name} </h1>

        <div className="entry-buttons">
          <button onClick={this.editPerson}>
            <i className="material-icons">mode_edit</i>
          </button>

          <button onClick={this.removePerson}>
            <i className="material-icons">delete</i>
          </button>
        </div>
      </li>
    );
  }
}

Person.propTypes = {
  person: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
  }).isRequired,
};
