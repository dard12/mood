import React, { Component } from 'react';

import _ from 'lodash';

export default class Emotion extends Component {
  renderScale() {
    return _.map(_.range(1, 5), value => {
      return (
        <li className="scale-option" key={value}>
          {value}
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="emotion-scale">
        {this.renderScale()}
      </ul>
    );
  }
}
