const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_CON);

		console.log('DB Online');
	} catch (error) {
		console.log(error);
		throw new Error('Fallo la conexion a la base de datos');
	}
};

module.exports = {
	dbConnection,
};
