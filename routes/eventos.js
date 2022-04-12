/*
    Rutas de eventos
    /api/events
*/

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const router = Router();
const {
	getEventos,
	crearEvento,
	actualizarEvento,
	eliminarEvento,
} = require('../controllers/eventos');
const {validarJWT} = require('../middlewares/validar-jwt');
const {isDate} = require('../helpers/isDate');

//Todas las rutas estan protegidas por el JWT
router.use(validarJWT);

//Obtener todos los eventos
router.get('/', getEventos);

//Crear un nuevo evento
router.post(
	'/',
	[
		check('title', 'El titulo es obligatorio').not().isEmpty(),
		check('start', 'Fecha de inicio es obligatoria').custom(isDate),
		check('end', 'Fecha final es obligatoria').custom(isDate),
		validarCampos,
	],
	crearEvento
);

//Editar un evento
router.put(
	'/:id',
	[
		check('title', 'El titulo es obligatorio').not().isEmpty(),
		check('start', 'Fecha de inicio es obligatoria').custom(isDate),
		check('end', 'Fecha final es obligatoria').custom(isDate),
		validarCampos,
	],
	actualizarEvento
);

//Eliminar evento
router.delete('/:id', eliminarEvento);

module.exports = router;
