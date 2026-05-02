/*
    Rutas de usuario / Auth
    host + /api/auth
*/
const { Router } = require('express')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')

const { validateJWT } = require('../middlewares/validate-jwt')

const router = Router()

//!Desestructurar lo que traemos de controller
const { createUser, loginUser, renewToken } = require('../controllers/auth')

router.post('/new', 
    // middlewares
[
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('email', 'El email es obligatorio.').isEmail(),
    check('password', 'La contraseña debe contener mas de 6 carácteres.').isLength({ min: 6 }), 
    validateFields
], 
createUser)

router.post('/', [
    check('email', 'El email es obligatorio.').isEmail(),
    check('password', 'La contraseña debe contener más de 6 carácteres.').isLength({ min: 6 }), 
    validateFields
], 
loginUser)

router.get('/renew', validateJWT, renewToken)

module.exports = router;

