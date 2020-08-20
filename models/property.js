const mongoose = require('mongoose');

const config = require('../config/database');

var Schema = mongoose.Schema;

const PropertySchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  deposit: {
    type: Number,
    required: true
  },
  monthly: {
    type: Number,
    required: true
  },
  rooms: {
    type: Number,
    required: true
  },
  address_object: {
    type: String
  },
  area: {
    type: Number,
    required: true
  },
  youtube: {
    type: String
  },
  moreimage: {
    type: String
  },
  available: {
    type: Date,
  },
  minstay: {
    type: Number,
  },
  maxstay: {
    type: Number,
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  rules: {
    type: String
  },
  documents: {
    type: String
  },
  landlordrules: {
    type: String
  },
  bathrooms: {
    type: Number
  },
  electricity: {
    type: String,
    default: "included"
  },
  water: {
    type: String,
    default: "included"
  },
  gas: {
    type: String,
    default: "included"
  },
  wifi: {
    type: String,
    default: "included"
  },
  street: {
    type: String,
    require: true
  },
  remain: {
    type: String,
    required: true
  },
  vicinity: {
    type: String,
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  image1: {
    type: String,
    default: 'no'
  },
  image2: {
    type: String,
    default: 'no'
  },
  image3: {
    type: String,
    default: 'no'
  },
  image4: {
    type: String,
    default: 'no'
  },
  image5: {
    type: String,
    default: 'no'
  },
  internet: {
    type: Boolean,
    default: false
  },
  cableTV: {
    type: Boolean,
    default: false
  },
  bBed: {
    type: Boolean,
    default: false
  },
  sBed: {
    type: Boolean,
    default: false
  },
  stove: {
    type: Boolean,
    default: false
  },
  washer: {
    type: Boolean,
    default: false
  },
  landline: {
    type: Boolean,
    default: false
  },
  fridge: {
    type: Boolean,
    default: false
  },
  fireplace: {
    type: Boolean,
    default: false
  },
  bathub: {
    type: Boolean,
    default: false
  },
  conditioner: {
    type: Boolean,
    default: false
  },
  microwave: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  approved: {
    type: Number,
    default: 0
  }
});


const Property = module.exports = mongoose.model('Property', PropertySchema);


module.exports.getPropertyById = function(id, callback) {
  Property.findById(id, callback);
}

module.exports.saveModProperty = function(id, property, callback) {
  var query = {
    _id: id
  };
  Property.findOneAndUpdate(query, property, callback);
}

module.exports.findUserPropertys = function(id, callback) {
  Property.find({
    "user": id
  }).populate().exec(callback);
}

module.exports.findAllProperties = function(query, callback) {
  if (query.remain != undefined)
    query.remain = {
      '$regex': query.remain,
      '$options': 'i'
    };
  Property.find(query).populate().exec(callback);
}

module.exports.addProperty = function(property, callback) {
  property.save(callback);
}
