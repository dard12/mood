import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Mongo } from 'meteor/mongo';
import _ from 'lodash';

class EntriesCollection extends Mongo.Collection {
  positiveEmotions = () => [
    'alert',
    'attentive',
    'inspired',
    'determined',
    'active',
  ];

  negativeEmotions = () => ['upset', 'ashamed', 'hostile', 'nervous', 'afraid'];

  allEmotions = () =>
    _.concat(this.positiveEmotions(), this.negativeEmotions());

  insert(entry = {}) {
    entry.createdAt = new Date();
    super.insert(entry);
  }
}

export const Entries = new EntriesCollection('entries');

Entries.helpers({
  getValue(targetEmotions = Entries.allEmotions()) {
    return _.sumBy(this.getEmotions(targetEmotions), 'value');
  },

  getEmotions(targetEmotions = Entries.allEmotions()) {
    return _.filter(this.emotions, emotion => {
      return _.includes(targetEmotions, emotion.name);
    });
  },
});

export class Entry extends Component {
  state = { editing: false };

  removeEntry = () => {
    Entries.remove({ _id: this.props.entry._id });
  };

  editEntry = () => {
    this.setState({ editing: !this.state.editing });
  };

  renderEditActions() {
    return (
      <div className="entry-edit-buttons">
        <button className="save-button" onClick={this.editEntry}>
          Save
        </button>

        <button className="cancel-button" onClick={this.editEntry}>
          Cancel
        </button>
      </div>
    );
  }

  renderValue(value) {
    const displayView = <span className="emotion-value"> {value} </span>;
    const editingView = (
      <input className="emotion-value" type="number" value={value} />
    );

    return this.state.editing ? editingView : displayView;
  }

  renderEmotions(emotions) {
    const savedEmotions = this.props.entry.getEmotions(emotions);

    return _.map(savedEmotions, ({ value, notes, name }) => {
      return (
        <div key={name}>
          <div className="emotion-row">
            <span>{_.capitalize(name)}</span>

            {this.renderValue(value)}
          </div>

          {notes && <div className="entry-notes"> {_.upperFirst(notes)} </div>}
        </div>
      );
    });
  }

  render() {
    return (
      <li className="entry">
        <h1 className="entry-title">
          {moment(this.props.entry.createdAt).format('MMM Do')}
        </h1>

        <div className="entry-buttons">
          <button onClick={this.editEntry}>
            <i className="material-icons">mode_edit</i>
          </button>

          <button onClick={this.removeEntry}>
            <i className="material-icons">delete</i>
          </button>
        </div>

        <div className="emotions-container">
          <div className="emotion-total emotion-row">
            <span> Positive </span>
            <span>{this.props.entry.getValue(Entries.positiveEmotions())}</span>
          </div>

          {this.renderEmotions(Entries.positiveEmotions())}
        </div>

        <div className="emotions-container">
          <div className="emotion-total emotion-row">
            <span> Negative </span>
            <span>{this.props.entry.getValue(Entries.negativeEmotions())}</span>
          </div>

          {this.renderEmotions(Entries.negativeEmotions())}
        </div>

        <div className="emotions-container">
          <div className="emotion-total emotion-row"> Gratitude </div>
          <div className="entry-notes">{this.props.entry.gratitude}</div>
        </div>

        {this.state.editing && this.renderEditActions()}
      </li>
    );
  }
}

const emotion = PropTypes.shape({
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  notes: PropTypes.string,
});

Entry.propTypes = {
  entry: PropTypes.shape({
    _id: PropTypes.string,
    emotions: PropTypes.arrayOf(emotion),
    gratitude: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    getEmotions: PropTypes.function,
  }).isRequired,
};
