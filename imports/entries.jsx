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
  getEmotions(emotions) {
    if (_.isEmpty(emotions)) {
      return this.emotions;
    } else {
      const pickedEmotions = {};

      _.each(this.emotions, (value, emotion) => {
        if (_.includes(emotions, emotion)) {
          pickedEmotions[emotion] = value;
        }
      });

      return pickedEmotions;
    }
  },
});

export class Entry extends Component {
  state = { editing: false };

  removeEntry = () => {
    Entries.remove({ _id: this.props.entry._id });
  };

  editEntry() {
    this.setState({ editing: true });
  }

  renderEmotions(emotions) {
    return _.map(this.props.entry.getEmotions(emotions), (value, emotion) => {
      return (
        <div className="emotion" key={emotion}>
          <span>
            {_.capitalize(emotion)}
          </span>

          <span className="emotion-score">
            {value}
          </span>
        </div>
      );
    });
  }

  render() {
    return (
      <li className="entry">
        <span className="entry-title">
          {moment(this.props.entry.createdAt).format('MMM Do')}
        </span>

        <div className="entry-buttons">
          <button onClick={this.editEntry}>
            <i className="material-icons">mode_edit</i>
          </button>

          <button onClick={this.removeEntry}>
            <i className="material-icons">delete</i>
          </button>
        </div>

        <div className="emotions-container">
          {this.renderEmotions(Entries.positiveEmotions())}
        </div>

        <div className="emotions-container">
          {this.renderEmotions(Entries.negativeEmotions())}
        </div>
      </li>
    );
  }
}

Entry.propTypes = {
  entry: PropTypes.shape({
    _id: PropTypes.string,

    emotions: PropTypes.shape({
      alert: PropTypes.number,
      attentive: PropTypes.number,
      inspired: PropTypes.number,
      determined: PropTypes.number,
      active: PropTypes.number,

      upset: PropTypes.number,
      ashamed: PropTypes.number,
      hostile: PropTypes.number,
      nervous: PropTypes.number,
      afraid: PropTypes.number,
    }),

    createdAt: PropTypes.instanceOf(Date),

    getEmotions: PropTypes.function,
  }).isRequired,
};
