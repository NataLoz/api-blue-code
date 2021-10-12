const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

/**
 * Metodo para verificar la autenticacion del usuario
 * @param {*Request} request 
 * @param {*Response} response 
 * @returns 
 */
const userLogin = async(request = Request, response = Response) => {
    const { email, password } = request.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            response.status(400).json({
                ok: true,
                msg: 'Usuario o contraseña errada'
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            response.status(400).json({
                ok: true,
                msg: 'Usuario o contraseña errada'
            });
        }

        response.json({
            ok: true,
            msg: 'Ok',
            data: User
        });

    } catch (error) {
        console.log('Error en la autenticacion' + error);
        response.status(500).json({
            ok: false,
            msg: 'error interno del servidor al autenticar',
        });
    }
}

const revalidarToken = (req, resp = response) => {
    resp.json({
        ok: true,
        msg: 'renew'
    });
} 

module.exports = {
    userLogin,
    revalidarToken 
};