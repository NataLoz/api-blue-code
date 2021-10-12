const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    id: { type: String, require: true, unique: true},
    nombredelproducto: { type: String, require: true },
    valorunitario: { type: String, require: true },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() }
}, {
    collection: 'Productos',
    versionKey: false
});

module.exports = model('Producto', ProductoSchema);