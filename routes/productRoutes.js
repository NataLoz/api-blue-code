const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, actualizarProducto, buscarProducto, eliminarProducto} = require('../controllers/ProductController');
const router = Router();

router.post('/new', crearProducto);

router.put('/:id', actualizarProducto);

router.delete('/:id', eliminarProducto);

router.get('/', buscarProducto);

module.exports = router;