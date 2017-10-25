import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Journal from '/imports/journal/journal.jsx';
import Record from '/imports/journal/record.jsx';
import Relationships from '/imports/relationships/relationships.jsx';

Meteor.startup(() => {
  render(
    <Router>
      <div>
        <Route exact path="/" component={Journal} />
        <Route path="/record" component={Record} />

        <Route path="/relationships" component={Relationships} />
      </div>
    </Router>,
    document.getElementById('root')
  );
});
