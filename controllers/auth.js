const {response} = require('express');
const {validationResult} = require('express-validator');

const crearUsuario = (req, res = response) => {
	const {name, email, password} = req.body;

	const err = validationResult(req);

	if (!err.isEmpty()) {
		return res.status(400).json({
			ok: false,
			errors: err.mapped(),
		});
	}

	res.status(201).json({
		ok: true,
		msg: 'Registro',
		name,
		email,
		password,
	});
};

const logInUsuario = (req, res = response) => {
	const {email, password} = req.body;
	res.json({
		ok: true,
		msg: 'Login',
		email,
		password,
	});
};

const revalidarToken = (req, res = response) => {
	res.json({
		ok: true,
		msg: 'renew',
	});
};

module.exports = {
	crearUsuario,
	logInUsuario,
	revalidarToken,
};
