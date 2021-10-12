const { Router } = require('express');
const { check } = require('express-validator');
const { Validate } = require('../middlewares/Validate');
const { userLogin, revalidarToken } = require('../controllers/AuthController');
const router = Router();


router.post(
    '/', [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        Validate
    ],
    userLogin);

router.get('/renew', revalidarToken);

// exportar las rutas configuradas
module.exports = router;