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

// mongoose.connect('mongodb+srv://josegabjimenez:M4n4ju4t3r@cluster0.ikc6z.mongodb.net/super_alitas?retryWrites=true&w=majority');
