import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Journal from '/imports/journal.jsx';
import Mood from '/imports/mood.jsx';

Meteor.startup(() => {
  render(
    <Router>
      <div>
        <Route exact path="/" component={Journal} />
        <Route path="/edit-entry" component={Mood} />
      </div>
    </Router>,
    document.getElementById('root')
  );
});
