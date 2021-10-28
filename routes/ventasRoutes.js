const { Router } = require("express");
const { check } = require('express-validator');
const { Validate } = require('../middlewares/Validate');
const { crearVenta, editarVenta, buscarVenta } = require("../controllers/VentaController");
const router = Router();

router.post('/new', [
    check('idProducto', 'El producto es obligatorio').not().isEmpty(),
    check('cantidad', 'Se debe ingresar al menos 1 producto').isLength({ min: 1 }),
    check('vendedor', 'Se debe ingresar al menos 1 vendedor').not().isEmpty(),
    check('idCliente', 'El id del cliente es obligatorio').not().isEmpty(),
    check('nombreCliente', 'El nombre del cliente es obligatorio').not().isEmpty(),
    Validate
], crearVenta);

router.put('/:id', editarVenta);

router.get('/', buscarVenta);

module.exports = router;
