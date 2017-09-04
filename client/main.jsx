import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Journal from '/imports/journal.jsx';
import Emotion from '/imports/emotion.jsx';

Meteor.startup(() => {
  render(
    <Router>
      <div>
        <Route exact path="/" component={Journal} />
        <Route path="/edit-entry" component={Emotion} />
      </div>
    </Router>,
    document.getElementById('root')
  );
});
