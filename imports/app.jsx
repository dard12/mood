import React, { Component } from 'react';
import { Random } from 'meteor/random';

import Log from './log.jsx';
import MiniMap from './mini-map.jsx';

import Commands from './commands.js';
import Player from './player.js';
import Area from './area.js';

export default class App extends Component {
  state = {
    level: 1,
    logs: [],
    player: new Player({
      app: this,
      area: new Area({ size: 3, app: this }),
      spawnPosition: [0, 0],
    }),
  };

  componentDidMount() {
    const second = 1000;

    setInterval(() => {
      this.slowTick();
    }, 60 * second);

    setInterval(() => {
      this.mediumTick();
    }, 2 * second);

    setInterval(() => {
      this.fastTick();
    }, second);

    this.state.player.look();
  }

  slowTick() {
    const currentArea = this.state.player.area;
    const tickSounds = [
      'Something rustles in the distance.',
      'You hear a small noise.',
      'A breeze passes by.',
      'The light dims.',
    ];

    this.addLog(_.sample(tickSounds));

    _.each(currentArea.characters, character => {
      character.tick();
    });
  }

  mediumTick() {
    const currentArea = this.state.player.area;

    _.each(currentArea.characters, character => {
      if (character && character.mobTick) {
        character.mobTick();
      }
    });
  }

  fastTick() {
    const currentArea = this.state.player.area;

    _.each(currentArea.characters, character => {
      if (character && character.aggro) {
        character.attack(character.aggro);
      }
    });
  }

  addLog(text = '', logType = 'default') {
    const logs = this.state.logs;
    const newLog = { _id: Random.id(), text, type: logType };
    logs.push(newLog);

    if (logs.length > 40) {
      logs.shift();
    }

    this.setState({ logs });

    const consoleLogs = $('.console-logs');

    // TODO: change 100 to a dynamic wait for rendering
    setTimeout(() => {
      consoleLogs.scrollTop(_.first(consoleLogs).scrollHeight);
    }, 100);
  }

  addEvent(text, { eventType, source, volume, logType }) {
    const player = this.state.player;
    const distanceFromSource = player.area.distance(player.position, source);

    if (eventType === 'scene' && !distanceFromSource) {
      this.addLog(text, logType);
    }

    if (eventType === 'sound' && volume >= distanceFromSource) {
      this.addLog(text, logType);
    }
  }

  submitCommand = event => {
    event.preventDefault();
    const commandInput = this.refs.command;
    const commandText = commandInput.value;
    const player = this.state.player;

    if (commandText) {
      Commands.handleInput(commandText, player);

      commandInput.value = '';
    }
  };

  renderLogs() {
    return this.state.logs.map(log =>
      <Log key={log._id} text={log.text} type={log.type} />
    );
  }

  render() {
    return (
      <div className="background">
        <div className="console-screen">
          <MiniMap map={this.state.player.getMap()} />

          <ul className="console-logs">
            {this.renderLogs()}
          </ul>

          <form className="console-character" onSubmit={this.submitCommand}>
            <p>
              {this.state.player.getStatus()}
            </p>
            <input type="text" ref="command" autoFocus autoComplete="off" />
          </form>
        </div>
      </div>
    );
  }
}
