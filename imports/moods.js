import { Mongo } from 'meteor/mongo';

class MoodsCollection extends Mongo.Collection {}

const Moods = new MoodsCollection('moods');

Moods.schema = {
  _id: { type: String },

  emotions: {
    alert: Number,
    attentive: Number,
    inspired: Number,
    determined: Number,
    active: Number,

    upset: Number,
    ashamed: Number,
    hostile: Number,
    nervous: Number,
    afraid: Number,
  },

  createdAt: Date,
};

export default Moods;
