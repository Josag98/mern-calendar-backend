const bcrypt = require('bcryptjs');
const {response} = require('express');
const {generarJWT} = require('../helpers/jwt');
const Usuario = require('../models/Usuario');

const crearUsuario = async (req, res = response) => {
	const {name, email, password} = req.body;

	try {
		let usuario = await Usuario.findOne({email});

		if (usuario) {
			return res.status(400).json({
				ok: false,
				msg: 'El correo ingresado ya esta asociado a una cuenta existente',
			});
		}

		usuario = new Usuario(req.body);

		//Encriptar contraseña
		const salt = bcrypt.genSaltSync();
		usuario.password = bcrypt.hashSync(password, salt);

		await usuario.save();

		//Generar JWT
		const token = await generarJWT(usuario.id, usuario.name);

		res.status(201).json({
			ok: true,
			msg: 'Usuario registrado con exito',
			uid: usuario.id,
			name: usuario.name,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Por favor pongase en contacto con el administrador del sitio',
		});
	}
};

const logInUsuario = async (req, res = response) => {
	const {email, password} = req.body;

	try {
		const usuario = await Usuario.findOne({email});

		if (!usuario) {
			return res.status(400).json({
				ok: false,
				msg: 'No hay ninguna cuenta asociada a este correo',
			});
		}
		//Validar ´password encriptada
		const validPassword = bcrypt.compareSync(password, usuario.password);

		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'Password incorrecto',
			});
		}

		//Generar JWT
		const token = await generarJWT(usuario.id, usuario.name);

		res.status(201).json({
			ok: true,
			msg: 'Ingreso con exito',
			uid: usuario.id,
			name: usuario.name,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Por favor pongase en contacto con el administrador del sitio',
		});
	}
};

const revalidarToken = async (req, res = response) => {
	const uid = req.uid;
	const name = req.name;

	//Crear JWT ya validado
	const token = await generarJWT(uid, name);

	res.json({
		ok: true,
		msg: 'Token Renovado',
		uid,
		name,
		token,
	});
};

module.exports = {
	crearUsuario,
	logInUsuario,
	revalidarToken,
};
