import React, { Component } from 'react';
import { Entries } from '/imports/entries.jsx';
import _ from 'lodash';

export default class Mood extends Component {
  state = {
    emotion: _.sample(Entries.positiveEmotions()),
  };

  renderScale() {
    return _.map(_.range(1, 6), value => {
      return (
        <li className="scale-option" key={value}>
          {value}
        </li>
      );
    });
  }

  render() {
    return (
      <div className="emotion-container">
        <h1 className="emotion-header">
          “ How often do you feel
          <span className="emotion-name">
            {_.capitalize(this.state.emotion)}
          </span>? ”
        </h1>

        <ul className="emotion-scale">
          <li className="scale-label"> Never </li>
          {this.renderScale()}
          <li className="scale-label"> Always </li>
        </ul>
      </div>
    );
  }
}
