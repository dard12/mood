import { Meteor } from 'meteor/meteor';
import { Entries } from '/imports/entries.js';

Meteor.publish('entries.journal', function entriesJournal() {
  return Entries.find();
});
