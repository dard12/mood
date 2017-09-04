import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Mongo } from 'meteor/mongo';

class EntriesCollection extends Mongo.Collection {}

export const Entries = new EntriesCollection('entries');

export class Entry extends Component {
  renderEmotions() {
    return _.map(this.props.emotions, (value, emotion) => {
      return (
        <div className="emotion">
          {emotion}: {value}
        </div>
      );
    });
  }

  render() {
    return (
      <li className="entry">
        {this.renderEmotions()}

        <span className="timestamp">
          {this.props.createdAt}
        </span>
      </li>
    );
  }
}

Entry.propTypes = {
  emotions: PropTypes.shape({
    alert: PropTypes.Number,
    attentive: PropTypes.Number,
    inspired: PropTypes.Number,
    determined: PropTypes.Number,
    active: PropTypes.Number,

    upset: PropTypes.Number,
    ashamed: PropTypes.Number,
    hostile: PropTypes.Number,
    nervous: PropTypes.Number,
    afraid: PropTypes.Number,
  }).isRequired,

  createdAt: PropTypes.instanceOf(Date),
};

Entry.defaultProps = {
  emotions: PropTypes.shape({
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
  }).isRequired,

  createdAt: new Date(),
};
