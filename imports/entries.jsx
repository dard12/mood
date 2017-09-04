import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Mongo } from 'meteor/mongo';
import _ from 'lodash';

class EntriesCollection extends Mongo.Collection {
  insert(entry = {}) {
    entry.createdAt = new Date();

    const defaultEmotions = Entry.defaultProps.entry.emotions;

    _.each(defaultEmotions, (defaultValue, emotion) => {
      if (!_.has(entry, emotion)) {
        entry.emotions[emotion] = defaultValue;
      }
    });

    super.insert(entry);
  }

  positiveEmotions() {
    return ['alert', 'attentive', 'inspired', 'determined', 'active'];
  }

  negativeEmotions() {
    return ['upset', 'ashamed', 'hostile', 'nervous', 'afraid'];
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
  removeEntry = () => {
    Entries.remove({ _id: this.props.entry._id });
  };

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

        <button className="entry-remove-btn" onClick={this.removeEntry}>
          {'x'}
        </button>

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
    }).isRequired,

    createdAt: PropTypes.instanceOf(Date).isRequired,

    getEmotions: PropTypes.function,
  }).isRequired,
};

Entry.defaultProps = {
  entry: {
    emotions: {
      alert: 0,
      attentive: 0,
      inspired: 0,
      determined: 0,
      active: 0,

      upset: 0,
      ashamed: 0,
      hostile: 0,
      nervous: 0,
      afraid: 0,
    },

    createdAt: new Date(),
  },
};
