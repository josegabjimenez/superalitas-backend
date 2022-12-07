var express = require('express');
var router = express.Router();
const {transporter} = require('../services/nodemailer');
const User = require('../models/User');
const mongoose = require('mongoose');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: 'Express'});
});

router.post('/email', async function (req, res, next) {
	const {name, email, phone} = req.body;

	const user = await User.findOne({email});

	if (!user) {
		// Create new user in database
		let _id = mongoose.Types.ObjectId();
		const newUser = new User({_id, name, email, phone});
		await newUser.save();

		// Send email
		await transporter.sendMail({
			from: '"Super Alitas 🍗" <supertalitas@gmail.com>', // sender address
			to: `${email}`, // list of receivers
			subject: 'Aquí está tu cupón para Super Alitas! 🎫', // Subject line
			text: '', // plain text body
			html: `<p>Hola ${name}, reclama este código en nuestras tiendas cercanas: <b>${phone}</b> </p>`, // html body
		});
		res.json({message: 'Email enviado correctamente'});
	} else {
		res.json({message: 'Ya existe el usuario.'});
	}
});

module.exports = router;
