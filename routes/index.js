var express = require('express');
var router = express.Router();
const {transporter} = require('../services/nodemailer');
const User = require('../models/User');
const mongoose = require('mongoose');
// const Logo = require('../public/assets/images/logo.png');

const generateCodeForUser = async () => {
	let code = Math.floor(100000 + Math.random() * 900000);
	const isCodeUsed = await User.findOne({code});
	if (isCodeUsed) {
		generateCodeForUser();
	} else {
		return code;
	}
};

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: 'Express'});
});

router.post('/email', async function (req, res, next) {
	const {name, email, phone} = req.body;

	const user = await User.findOne({$or: [{email}, {phone}]});

	if (!user) {
		// Create new user in database
		let _id = mongoose.Types.ObjectId();
		const code = await generateCodeForUser();
		const newUser = new User({_id, name, email, phone, code});
		await newUser.save();

		// Send email
		await transporter.sendMail({
			from: '"Super Alitas 🍗" <supertalitas@gmail.com>', // sender address
			to: `${email}`, // list of receivers
			subject: 'Aquí está tu cupón para Super Alitas! 🎫', // Subject line
			text: '', // plain text body
			html: `<div style="width: 100%; height: 400px; display: inline-block; justify-content: center; align-items: center; background-color: white">
	
			<p>Tómale un pantallazo al cupón y redímelo en nuestros restaurantes.</p>
			<p>Email: ${email}</p>
			<p>Teléfono: ${phone}</p>
	
			<div
				style="
					display: inline-block;
					padding: 15px;
					width: 380px;
					height: 260px;
					background-color: #a50b0d;
					border-width: 5px;
					border-color: #ffde59;
					border-radius: 15px;
					color: white;
				"
			>
				<div>
					<h2>HOLA ${name}, \nESTE CUPÓN VALE POR:</h2>
					<h4>Ad papas o Ad yukas o Ad aros de cebolla</h4>
				</div>
				<hr style="background-color: #ffde59; color: #ffde59; border-radius: 15px" />
				<div style="color: #ffde59">
					<h1>Código: ${code}</h1>
				</div>
			</div>
		</div>`, // html body
		});
		res.status(200).json({message: 'Email enviado correctamente'});
	} else {
		res.status(400).json({message: 'Ya reclamaste un cupón.'});
	}
});

module.exports = router;
