import React, { Component } from 'react';
import { Entries } from '/imports/entries.jsx';
import { Link } from 'react-router-dom';
import _ from 'lodash';

export default class Record extends Component {
  state = {
    remainingEmotions: _.shuffle(Entries.allEmotions()),
    savedEmotions: [],
  };

  getCurrentEmotion() {
    return _.first(this.state.remainingEmotions);
  }

  saveAnswer = value => {
    const { remainingEmotions, savedEmotions } = this.state;
    const emotion = remainingEmotions.shift();

    savedEmotions.push({ emotion, value });

    if (this.getCurrentEmotion()) {
      this.setState({ remainingEmotions, savedEmotions });
    } else {
      const emotions = {};

      _.each(savedEmotions, ({ emotion, value }) => {
        emotions[emotion] = value;
      });

      Entries.insert({ emotions });

      this.props.history.push('/');
    }
  };

  goPrevious = () => {
    const { remainingEmotions, savedEmotions } = this.state;
    const lastAnswer = savedEmotions.shift();

    remainingEmotions.unshift(lastAnswer.emotion);

    this.setState({ remainingEmotions, savedEmotions });
  };

  renderBack() {
    if (!_.isEmpty(this.state.savedEmotions)) {
      return (
        <button className="record-back" onClick={this.goPrevious}>
          <i className="material-icons">keyboard_arrow_left</i>
          Previous
        </button>
      );
    }
  }

  renderScaleOptions() {
    return _.map(_.range(1, 6), value => {
      return (
        <button
          className="scale-option"
          onClick={() => this.saveAnswer(value)}
          key={value}
        >
          {value}
        </button>
      );
    });
  }

  renderScale() {
    return (
      <ul className="record-scale">
        <li className="scale-label"> Very little </li>

        {this.renderScaleOptions()}

        <li className="scale-label"> Extremely </li>
      </ul>
    );
  }

  renderQuestion() {
    const currentEmotion = this.getCurrentEmotion();
    const emotionQuestion = (
      <span>
        How
        <span className="record-name"> {_.capitalize(currentEmotion)} </span>
        do you feel today?
      </span>
    );

    const gratitudeQuestion = (
      <span>
        What are you <span className="record-name"> grateful </span> for?
      </span>
    );

    return currentEmotion ? emotionQuestion : gratitudeQuestion;
  }

  render() {
    return (
      <div className="record-container">
        <div className="record-row">
          <Link className="record-close" to="/">
            <i className="material-icons"> close </i>
          </Link>

          {this.renderBack()}

          <h1> “ {this.renderQuestion()} ” </h1>

          {this.renderScale()}

          <textarea className="record-explanation" rows="4" />
        </div>
      </div>
    );
  }
}
