import React, { Component } from 'react';
import { Entries } from '/imports/entries.jsx';
import { Link } from 'react-router-dom';
import _ from 'lodash';

export default class Record extends Component {
  state = {
    currentEmotion: _.sample(Entries.positiveEmotions()),
    remainingEmotions: Entries.defaultProps.emotions,
    savedEmotions: {},
  };

  saveQuestion = value => {
    const { currentEmotion, remainingEmotions, savedEmotions } = this.state;

    savedEmotions[currentEmotion] = 1;
    delete remainingEmotions[currentEmotion];

    const nextEmotion = _.sample(_.keys(remainingEmotions));

    this.setState({
      currentEmotion: nextEmotion,
      remainingEmotions,
      savedEmotions,
    });
  };

  renderScale() {
    return _.map(_.range(1, 6), value => {
      return (
        <button
          className="scale-option"
          onClick={this.saveQuestion}
          key={value}
        >
          {value}
        </button>
      );
    });
  }

  render() {
    return (
      <div className="record-container">
        <div className="record-row">
          <Link className="record-close" to="/">
            <i className="material-icons"> close </i>
          </Link>

          <h1>
            “ How
            <span className="record-name">
              {_.capitalize(this.state.currentEmotion)}
            </span>
            do you feel today? ”
          </h1>

          <ul className="record-scale">
            <li className="scale-label"> Very little </li>
            {this.renderScale()}
            <li className="scale-label"> Extremely </li>
          </ul>
        </div>
      </div>
    );
  }
}
