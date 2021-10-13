const { response } = require('express');
const Producto = require('../models/Producto');


const crearProducto = async (req, res = response) => {
    const product = new Producto(req.body);
    try {
        const productNew = await product.save();
        res.status(201).json({
            msg: 'Producto guardado',
            productNew
        });

    } catch (error) {
        res.status(500).json({
            msg: `${error}`
        });

    }
};

const actualizarProducto = async (req, res = response) => {
    const productID = req.params.id;
    try {
        const product = await Producto.findById(productID);
        if (!product) {
            res.status(404).json({
                msg: "Este producto no existe",
            });
        }

        const productActualizado = await Producto.findByIdAndUpdate(product, req.body, { new: true });

        res.status(200).json({
            msg: "Producto actualizado correctamente",
            producto: productActualizado,
        });

    } catch (error) {
        res.status(500).json({
            msg: `${error}`
        });
    }
};

const eliminarProducto = async (req, resp = response) => {

    const productID = req.params.id;

    try {
        const product = await Producto.findById(productID);

        if (!product) {
            resp.status(404).json({
                msg: 'El id del producto no coincide con ningun elemento en la base de datos',
            });
        }

        await Producto.findByIdAndDelete(product);

        resp.json({
            msg: 'Producto eliminado de manera exitosa'
        });


    } catch (error) {
        resp.status(500).json({
            msg: 'Error al eliminar el producto',
        });
    }
}

const buscarProducto = async (req, res = response) => {

    const { id, nombre } = req.query;
    try {
        if (nombre) {
            const product = await Producto.find({ 'nombre': { '$regex': `${nombre}`, '$options': 'i' } });
            res.status(200).json({
                msg: "Lista de productos",
                productos: product,
            });
        } else if (id) {
            const product = await Producto.findById(id);
            res.status(200).json({
                msg: "Lista de productos",
                productos: product,
            });
        } else {
            res.status(200).json({
                msg: "Producto no existente"
            });
        }
    } catch (e) {
        res.status(404).json({
            msg: "Producto no encontrado"
        });
    }
}

module.exports = {
    crearProducto,
    actualizarProducto,
    buscarProducto,
    eliminarProducto
}