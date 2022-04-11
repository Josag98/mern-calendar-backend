const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
	name: {
		type: 'string',
		require: true,
	},
	email: {
		type: 'string',
		require: true,
		unique: true,
	},
	password: {
		type: 'string',
		require: true,
	},
});

module.exports = model('Usuario', UsuarioSchema);
