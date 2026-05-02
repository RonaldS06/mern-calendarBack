/* 
    Rutas de Eventos
    /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields')

const {validateJWT} = require('../middlewares/validate-jwt')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('./../controllers/events');
const { isDate } = require('../helpers/isDate');

const router = Router();
// Todas tienen que pasar por la validación del JWT
// router.use dice que apartir de esta linea tienen que pasar por validateJWT
router.use( validateJWT );

// Obtener eventos
router.get('/', getEvents)

// Crear un nuevo evento
router.post('/', 
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatorio').custom(isDate),
        check('end','La fecha de fin es obligatario' ).custom(isDate),
        validateFields
    ], 
    createEvent)

// Actualizar evento
router.put('/:id', updateEvent)

// Borrar evento
router.delete('/:id', deleteEvent)

module.exports = router;


