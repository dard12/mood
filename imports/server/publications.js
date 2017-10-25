import { Meteor } from 'meteor/meteor';
import { Entries } from '/imports/journal/entries.jsx';
import { People } from '/imports/relationships/people.jsx';

Meteor.publish('entries', function entriesJournal() {
  return Entries.find();
});

Meteor.publish('people', function entriesJournal() {
  return People.find();
});
