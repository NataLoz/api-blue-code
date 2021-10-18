const { Router } = require('express');
const { check } = require('express-validator');
const { Validate } = require('../middlewares/Validate');
const { getRol, createRol, updateRol, deleteRol } = require('../controllers/RolesController');
const { validateJWT } = require('../middlewares/ValidateJwt');
const router = Router();


router.use(validateJWT);

/**
 * Rutas para la gestion de usuarios
 */
router.get(
    '/list',
    getRol);

router.post(
    '/create', [
        check('name', 'El nombre del rol es obligatorio').not().isEmpty(),
        check('typeRol', 'El tipo de rol es obligatorio').not().isEmpty().isNumeric(),
        Validate
    ],
    createRol);

router.put(
    '/edit', [
        check('name', 'El nombre del rol es obligatorio').not().isEmpty(),
        check('typeRol', 'El tipo de rol es obligatorio').not().isEmpty().isNumeric(),
        Validate
    ],
    updateRol);

router.delete(
    '/delete',
    deleteRol);

// exportar las rutas configuradas
module.exports = router;