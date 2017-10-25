import React, { Component } from 'react';
import { Mongo } from 'meteor/mongo';

class PeopleCollection extends Mongo.Collection {}

export const People = new PeopleCollection('people');

export class Person extends Component {
  state = { editing: false };

  render() {
    return <div> thing </div>;
  }
}
