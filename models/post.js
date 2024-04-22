var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const User = require('./user');

const pollSchema = new Schema({
    question: {
      type: String,
      required: true,
      trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    options: [{
      optionText: {
        type: String,
        required: true,
        trim: true
      },
      votes: {
        type: Number,
        default: 0
      } ,
      voters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }]
    }],
  }, { timestamps: true });


module.exports = mongoose.model('Post',pollSchema);