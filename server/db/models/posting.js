'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new mongoose.Schema({
  client: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  artistsWhoSaved: {type: [{type: Schema.Types.ObjectId, ref: 'User'}], default: []},
  artistsWhoRequested: {type: [{user: {type: Schema.Types.ObjectId, ref: 'User'}, time: {type: Date, default: Date.now}}], default: []},
  artist: {type: Schema.Types.ObjectId, ref: 'User'},
  location: String,
  title: {type: String, required: true},
  description: String,
  photos: [{type: String, default: 'js/common/directives/navbar/michelangelo-hands.jpg'}],
  price: {type: Number, default: 786528901},
  status: {type: String, default: "unstarted", match: /(unstarted|started|pendingApproval|complete)/},
  paid: {type: Boolean , default: false},
  date: { type: Date, default: Date.now },
  size: String,
  tags: [String],
  reviews: {
    client: {
      stars: {type: Number, enum: [1, 2, 3, 4, 5]},
      text: String
    },
    artist: {
      stars: {type: Number, enum: [1, 2, 3, 4, 5]},
      text: String
    }
  }
});

schema.pre('save', function(next) {
  if(this.isNew && 0 === this.photos.length){
    this.photos = ['js/common/directives/navbar/michelangelo-hands.jpg'];
  }
  next();
});
mongoose.model('Posting', schema);
