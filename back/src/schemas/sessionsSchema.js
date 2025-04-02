const mongoose = require('mongoose');
const { Schema, SchemaTypes } = mongoose;

const sessionSchema = new Schema(
  {
    uid: {
      type: SchemaTypes.ObjectId,
      required: true,
    },
  },
  { id: false, timestamps: { createdAt: 'created', updatedAt: 'updated' } }
);

const Session = mongoose.connection.model('Session', sessionSchema, 'session');
module.exports = Session;
