const { Router } = require('express');
const { check } = require('express-validator');
const { Validate } = require('../middlewares/Validate');
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
        // check('rol', 'El rol del usuario es obligatorio').isNumeric(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        Validate
    ],
    createUser);

router.put(
    '/edit', [
        check('user', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('phone', 'El numero de telefono es obligatorio').isNumeric({ min: 10 }),
        check('rol', 'El rol del usuario es obligatorio').isNumeric(),
        Validate
    ],
    updateUser);

router.delete(
    '/delete',
    deleteUser);

// exportar las rutas configuradas
module.exports = router;