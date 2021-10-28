const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, actualizarProducto, buscarProducto, eliminarProducto, buscarProductoId} = require('../controllers/ProductController');
const router = Router();

router.post('/new', crearProducto);

router.put('/:id', actualizarProducto);

router.delete('/:id', eliminarProducto);

router.get('/', buscarProducto);

router.get('/:id', buscarProductoId);

module.exports = router;