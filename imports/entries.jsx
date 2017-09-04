import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Mongo } from 'meteor/mongo';

class EntriesCollection extends Mongo.Collection {}

export const Entries = new EntriesCollection('entries');

export class Entry extends Component {
  renderEmotions() {
    return _.map(this.props.emotions, (value, emotion) => {
      return (
        <div className="emotion" key={emotion}>
          {emotion}: {value}
        </div>
      );
    });
  }

  render() {
    return (
      <li className="entry">
        <span className="entry-title">
          {moment(this.props.createdAt).format('MMM Do')} Entry
        </span>

        {this.renderEmotions()}
      </li>
    );
  }
}

Entry.propTypes = {
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
};

Entry.defaultProps = {
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
};
