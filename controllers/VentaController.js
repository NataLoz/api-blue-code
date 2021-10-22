const { response } = require('express');
const Producto = require('../models/Producto');
const Venta = require('../models/Venta');

const crearVenta = async (req, res = response) => {
    const getProducto = async (idProducto) => {
        const result = await Producto.findById(idProducto)
        if (!result) {
            res.status(401).json({
                msg: "Producto no existe"
            })
        } else {
            const { valor } = result;
            const valorTotal = valor * cantidad;
            compra.valorTotal = valorTotal;
            const compraNueva = await compra.save();
            res.status(201).json({
                msg: 'Venta guardada',
                compraNueva
            });
        }
    }
    const { idProducto, cantidad } = req.body;
    const compra = new Venta(req.body);
    try {
        getProducto(idProducto);
    } catch (error) {
        res.status(500).json({
            msg: `${error}`
        });
    }
};

const editarVenta = async (req, res = response) => {
    const ventaID = req.params.id;
    try {
        const sell = await Venta.findById(ventaID);
        if (!sell) {
            res.status(404).json({
                msg: "Este producto no existe",
            });
        }

        const ventaActualizada = await Venta.findByIdAndUpdate(sell, req.body, { new: true });

        res.status(200).json({
            msg: "Producto actualizado correctamente",
            Venta: ventaActualizada,
        });

    } catch (error) {
        res.status(500).json({
            msg: `${error}`
        });
    }
}

const buscarVenta = async (req, res = response) => {
    const searchID = async (id) => {
        const compra = await Venta.findById(id);
        if (compra) {
            res.status(200).json({
                msg: "Listado de ventas",
                Ventas: compra
            });
        } else {
            res.status(404).json({
                msg: "No existe ventas con este ID"
            });
        }
    }

    const searchName = async (nombre) => {
        const compra = await Venta.find({ 'nombreCliente': { '$regex': `${nombre}`, '$options': 'i' } });
        if (!compra.length == 0) {
            res.status(200).json({
                msg: `Lista de ventas del cliente ${nombre}`,
                Ventas: compra,
            });
        } else {
            res.status(404).json({
                msg: "Este cliente no tiene ventas"
            });
        }

    }

    const searchCC = async (cc) => {
        const compra = await Venta.find({ 'idCliente': { '$regex': `${cc}` } })
        if (!compra.length == 0) {
            res.status(200).json({
                msg: `Lista de ventas del cliente ${cc}`,
                Ventas: compra,
            });
        } else {
            res.status(404).json({
                msg: "Este cliente no tiene ventas"
            });
        }
    }

    if (Object.entries(req.query).length === 0) {
        try {
            const compra = await Venta.find();
            res.status(200).json({
                msg: 'Lista de Productos',
                compra
            });
        } catch (error) {
            res.status(500).json({
                msg: `${error}`
            });
        }
    } else {
        const { id, nombreCliente, CC } = req.query;
        if (id) {
            searchID(id);
        } else if (nombreCliente) {
            searchName(nombreCliente);
        } else if (CC) {
            searchCC(CC);
        }
    }
}
module.exports = {
    crearVenta,
    editarVenta,
    buscarVenta
}