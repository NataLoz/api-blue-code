const { response } = require('express');
const { OAuth2Client } = require('google-auth-library');
const { subscribe } = require('../routes/authRoutes');
const client = new OAuth2Client('55000912305-alve6692sj0jjb6dia5hr7v5o1tqanl0.apps.googleusercontent.com');


/**
 * 
 * @param {*Request} request 
 * @param {*Response} response 
 * @param {*} next 
 * @returns 
 */
const googleValidate = (request = Request, response = Response, next) => {

    let token = '';
    token = request.headers['x-acces-token'] || request.headers['authorization']

    if (!token) {
        return response.status(401).json({
            ok: false,
            msg: 'No se ha proporcionado un token valido'
        });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    try {
        client.verifyIdToken({
                idToken: token,
                audience: '55000912305-alve6692sj0jjb6dia5hr7v5o1tqanl0.apps.googleusercontent.com'
            })
            .then((response) => {
                const { sub, name, email } = response.payload;
                console.log(sub, name, email);
                next();
            })
            .catch((error) => {
                return response.status(401).json({
                    ok: false,
                    msg: 'Token invalido',
                    error: error
                });
            });
    } catch (error) {
        return response.status(500).json({
            ok: false,
            msg: 'Error en el servidor al procesar la solicitud',
            error: error
        });
    }
}

module.exports = {
    googleValidate
}