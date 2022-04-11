const jwt = require('jsonwebtoken');

const generarJWT = (uid, name) => {
	return new Promise((resolve, reject) => {
		const payload = {uid, name};
		console.log(payload);
		jwt.sign(
			payload,
			process.env.SECRET_JWT_SEED,
			{expiresIn: '2h'},
			(err, token) => {
				if (err) {
					console.log(err);
					reject('No se pudo generar correctamente el token');
				}

				resolve(token);
			}
		);
	});
};

module.exports = {
	generarJWT,
};
