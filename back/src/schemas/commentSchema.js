const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    text: {
      type: String,
      default: '',
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Users',
    },
    game: {
      type: mongoose.SchemaTypes.ObjectId,
    },
  },
  { id: false, timestamps: { createdAt: 'created', updatedAt: 'updated' } }
);

const Comment = mongoose.connection.model('Comment', commentSchema, 'comment');
module.exports = Comment;
