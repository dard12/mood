import React, { Component } from 'react';
import { Entries } from '/imports/entries.jsx';
import { Link } from 'react-router-dom';
import _ from 'lodash';

export default class Record extends Component {
  state = {
    remainingEmotions: _.shuffle(Entries.allEmotions()),
    savedEmotions: [],
    notes: '',
    gratitude: '',
  };

  getCurrentEmotion() {
    return _.first(this.state.remainingEmotions);
  }

  entryFinished() {
    return !this.getCurrentEmotion() && this.state.gratitude;
  }

  saveAnswer = value => {
    const { remainingEmotions, savedEmotions, notes, gratitude } = this.state;
    const name = remainingEmotions.shift();

    savedEmotions.push({ name, value, notes });

    if (this.entryFinished()) {
      Entries.insert({ emotions: savedEmotions, gratitude });
      this.props.history.push('/');
    } else {
      this.setState({ remainingEmotions, savedEmotions, notes: '' });
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

          <textarea className="record-text" rows="1" placeholder="What happened?" />

          {this.renderScale()}
        </div>
      </div>
    );
  }
}
