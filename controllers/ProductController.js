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

    const searchID = async (id) => {
        const product = await Producto.findById(id);
        console.log(product);
        if (product) {
            res.status(200).json({
                msg: "Lista de productos",
                productos: product,
            });
        } else {
            res.status(404).json({
                msg: "Este producto no existe"
            });
        }
    }

    const searchName = async (nombre) => {
        const product = await Producto.find({ 'nombre': { '$regex': `${nombre}`, '$options': 'i' } });
        if (!product.length == 0) {
            res.status(200).json({
                msg: "Lista de productos",
                productos: product,
            });
        }else{
            res.status(404).json({
                msg: "Este producto no existe"
            });
        }

    }

    if (Object.entries(req.query).length === 0) {
        try {
            const product = await Producto.find();
            res.status(200).json({
                msg: 'Lista de Productos',
                product
            });
        } catch (error) {
            res.status(500).json({
                msg: `${error}`
            });
        }
    } else {
        const { id, nombre } = req.query;
        if (id) {
            searchID(id);
        } else {
            searchName(nombre);
        }
    }
}

const buscarProductoId = async (req, res = response) => {
    const productID = req.params.id;

    try {
        const producto = await Producto.findById(productID);

        if (!producto) {
            res.status(404).json({
                ok: false,
                msg: 'El id del producto no coincide con ningun elemento en la base de datos',
            });
        }

        res.json({
            ok: true,
            msg: 'Producto encontrado de manera exitosa',
            data: producto
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el producto',
        });
    }
}

module.exports = {
    crearProducto,
    actualizarProducto,
    buscarProducto,
    eliminarProducto,
    buscarProductoId
}