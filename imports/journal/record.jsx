import React, { Component } from 'react';
import { Entries } from '/imports/journal/entries.jsx';
import { Link } from 'react-router-dom';
import _ from 'lodash';

export default class Record extends Component {
  state = {
    remainingEmotions: _.shuffle(Entries.allEmotions()),
    savedEmotions: [],
    inputText: '',
  };

  getCurrentEmotion() {
    return _.first(this.state.remainingEmotions);
  }

  saveAnswer = value => {
    const { remainingEmotions, savedEmotions, inputText } = this.state;

    if (this.getCurrentEmotion()) {
      const name = remainingEmotions.shift();
      savedEmotions.push({ name, value, notes: inputText });
      this.setState({ remainingEmotions, savedEmotions, inputText: '' });
    } else {
      Entries.insert({ emotions: savedEmotions, gratitude: inputText });
      this.props.history.push('/');
    }
  };

  goPrevious = () => {
    const { remainingEmotions, savedEmotions } = this.state;
    const lastAnswer = savedEmotions.pop();

    remainingEmotions.unshift(lastAnswer.name);

    this.setState({
      remainingEmotions,
      savedEmotions,
      inputText: lastAnswer.notes,
    });
  };

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

  renderFinish() {
    return (
      <button className="record-finish mint" onClick={this.saveAnswer}>
        <i className="material-icons">check</i>
        <span> Finish </span>
      </button>
    );
  }

  emotionQuestion() {
    return (
      <span>
        How
        <span className="record-name">
          {_.capitalize(this.getCurrentEmotion())}
        </span>
        do you feel today?
      </span>
    );
  }

  gratitudeQuestion() {
    return (
      <span>
        What are you <span className="record-name"> Grateful </span> for?
      </span>
    );
  }

  recordText = event => {
    this.setState({ inputText: event.currentTarget.value });
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

  render() {
    return (
      <div className="record-container">
        <div className="record-row">
          <Link className="record-close" to="/">
            <i className="material-icons"> close </i>
          </Link>

          {this.renderBack()}

          <h1>
            “
            {this.getCurrentEmotion() ? (
              this.emotionQuestion()
            ) : (
              this.gratitudeQuestion()
            )}
            ”
          </h1>

          <textarea
            className="record-text"
            rows="2"
            placeholder="What happened?"
            value={this.state.inputText}
            onChange={this.recordText}
          />

          {this.getCurrentEmotion() ? this.renderScale() : this.renderFinish()}
        </div>
      </div>
    );
  }
}
