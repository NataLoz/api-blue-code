const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUser, createUser, updateUser, deleteUser } = require('../controllers/UsersController');
const router = Router();

/**
 * Rutas para la gestion de usuarios
 */
router.get(
    '/list',
    getUser);

router.post(
    '/create', [
        check('user', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('phone', 'El numero de telefono es obligatorio').isNumeric({ min: 10 }),
        check('rol', 'El rol del usuario es obligatorio').isNumeric(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    createUser);

router.put(
    '/edit', [
        check('user', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('phone', 'El numero de telefono es obligatorio').isNumeric({ min: 10 }),
        check('rol', 'El rol del usuario es obligatorio').isNumeric(),
        validarCampos
    ],
    updateUser);

router.delete(
    '/delete',
    deleteUser);

// exportar las rutas configuradas
module.exports = router;