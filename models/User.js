const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
	_id: ObjectId,
	email: String,
	name: String,
	phone: Number,
	code: Number,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
