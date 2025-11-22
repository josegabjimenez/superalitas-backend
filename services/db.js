const mongoose = require('mongoose');
class DBInstance {
	connect(uri) {
		mongoose
			.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
			.then(() => console.log('DB connected'))
			.catch((e) => console.log('DB Error:', e));
	}
}

module.exports = DBInstance;
