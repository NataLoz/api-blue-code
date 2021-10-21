const { Schema, model } = require('mongoose');


const ventaSchema = Schema({
    idProducto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        require: true
    },
    cantidad: {
        type: Number,
        require: true
    },
    valorTotal: {
        type: Number,
        require: true
    },
    estado: {
        type: String,
        default: 'En proceso'
    },
    vendedor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    fechaVenta: {
        type: Date,
        default: Date.now()
    },
    idCliente: {
        type: Number,
        require: true
    },
    nombreCliente: {
        type: String,
        require: true
    }
});

module.exports = model('Venta', ventaSchema);