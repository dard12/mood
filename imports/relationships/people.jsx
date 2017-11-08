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
  state = {
    editing: false,
    name: this.props.person.name,
    about: this.props.person.about,
  };

  removePerson = () => {
    People.remove({ _id: this.props.person._id });
  };

  editPerson = () => {
    this.setState({ editing: !this.state.editing });
  };

  saveEdit = () => {
    this.setState({ editing: false });

    People.update(
      { _id: this.props.person._id },
      {
        $set: {
          name: this.state.name,
          about: this.state.about,
        },
      }
    );
  };

  changeProfile = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  profile = () => {
    return (
      <div>
        <h1 className="entry-title">{this.props.person.name}</h1>

        <p className="profile-about">{this.props.person.about}</p>
      </div>
    );
  };

  editProfile = () => {
    return (
      <div>
        <input
          className="entry-title"
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.changeProfile}
        />

        <textarea
          className="profile-about"
          type="text"
          name="about"
          value={this.state.about}
          onChange={this.changeProfile}
          rows="10"
        />
      </div>
    );
  };

  editButtons() {
    return (
      <div className="entry-edit-buttons">
        <button className="save-button" onClick={this.saveEdit}>
          Save
        </button>

        <button className="cancel-button" onClick={this.editPerson}>
          Cancel
        </button>
      </div>
    );
  }

  render() {
    return (
      <li className="person">
        <div className="entry-buttons">
          <button onClick={this.editPerson}>
            <i className="material-icons">mode_edit</i>
          </button>

          <button onClick={this.removePerson}>
            <i className="material-icons">delete</i>
          </button>
        </div>

        {this.state.editing ? this.editProfile() : this.profile()}
        {this.state.editing && this.editButtons()}
      </li>
    );
  }
}

Person.propTypes = {
  person: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    about: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
  }).isRequired,
};
