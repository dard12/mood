import { Meteor } from 'meteor/meteor';

import { Moods } from '/imports/moods.js';

Meteor.publish('moods.user', function listsPublic() {
  return Moods.find();
});
