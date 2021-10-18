const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (request, response = response, next) => {

    /**x-token headers */

    const token = request.header('x-token');

    if (!token) {
        return response.status(401).json({
            ok: false,
            msg: 'No se ha proporcionado un toke valido'
        });
    }

    // console.log(token);

    try {

        const { uid, name } = jwt.verify(
            token,
            process.env.Secret_JWT
        );

        request.uid = uid;
        request.name = name;



    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token invalido'
        });
    }

    next();

}

module.exports = {
    validateJWT
}