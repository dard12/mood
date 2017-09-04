import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import Journal from '/imports/journal.jsx';

Meteor.startup(() => {
  _ = lodash;
  render(<Journal />, document.getElementById('render-target'));
});
