const { Schema, model } = require('mongoose');

const productoSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    valor: {
        type: Number,
        require: true,
    },
    estado: {
        type: Number,
        require: true
    }

});

module.exports = model("Producto", productoSchema);