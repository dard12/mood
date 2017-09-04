import { Meteor } from 'meteor/meteor';
import { Entries } from '/imports/entries.jsx';

Meteor.publish('entries.journal', function entriesJournal() {
  return Entries.find();
});
