const {Schema, model} = require('mongoose');

const EventoSchema = Schema({
	title: {
		type: 'string',
		require: true,
	},
	notes: {
		type: 'string',
	},
	start: {
		type: Date,
		reuire: true,
	},
	end: {
		type: Date,
		reuire: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
	},
});

module.exports = model('Evento', EventoSchema);
