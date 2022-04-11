/* 
Rutas de Usuarios /Auth
host + /api/auth
*/

const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const {
	crearUsuario,
	logInUsuario,
	revalidarToken,
} = require('../controllers/auth');

router.post(
	'/new',
	[
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		check(
			'password',
			'El password debe de ser minimo de 6 caracteres'
		).isLength({min: 6}),
	],
	crearUsuario
);
router.post('/', logInUsuario);
router.get('/renew', revalidarToken);

module.exports = router;