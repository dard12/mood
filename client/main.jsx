import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Journal from '/imports/journal.jsx';
import Record from '/imports/record.jsx';

Meteor.startup(() => {
  render(
    <Router>
      <div>
        <Route exact path="/" component={Journal} />
        <Route path="/record" component={Record} />
        <Route path="/relationships" component={Journal} />
      </div>
    </Router>,
    document.getElementById('root')
  );
});
