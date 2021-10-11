const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User')

/**
 * Metodo para listar los usuarios
 * @param {*Request} request 
 * @param {*Response} response 
 * @returns 
 */
const getUser = async(request = Request, response = Response) => {

    try {
        let getUser = await User.find();

        if (!getUser) {
            return response.status(400).json({
                ok: false,
                msg: 'No hay Registros actualmente'
            });
        }

        response.status(200).json({
            ok: true,
            msg: 'Registros encontrados exitosamente',
            data: getUser
        });

    } catch (error) {
        console.log('Error en listar usuarios' + error);
        response.status(500).json({
            ok: false,
            msg: 'error interno del servidor al buscar los registro',
        });
    }
}

/**
 * Metodo para la creacion de usuarios
 * @param {*Request} request 
 * @param {*Response} response 
 * @returns 
 */
const createUser = async(request = Request, response = Response) => {

    const { email, password } = request.body;

    try {

        let user = await User.findOne({ email });

        if (user) {
            return response.status(400).json({
                ok: false,
                msg: 'ya existe un usuario registrado con este email'
            });
        }

        user = new User(request.body);

        /**Encriptando contraseña */
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        response.status(201).json({
            ok: true,
            msg: 'Usuario creado de manera exitosa',
            data: User
        });

    } catch (error) {
        console.log('Error al crear usuarios' + error);
        response.status(500).json({
            ok: false,
            msg: 'error interno del servidor al guardar el registro',
        });
    }
}

/**
 * Metodo para la actualizacion de usuarios
 * @param {*Request} request 
 * @param {*Response} response 
 * @returns 
 */
const updateUser = async(request = Request, response = Response) => {

    const { email } = request.body;

    try {
        const user = await User.findOneAndUpdate({ email }, request.body);

        if (user) {
            response.status(201).json({
                ok: true,
                msg: 'Usuario actualizado de manera exitosa',
                data: User
            });
        }

        return response.status(400).json({
            ok: false,
            msg: 'Ubo un problema al momento de actualizar el usuario'
        });

    } catch (error) {
        console.log('Error al actualizar usuarios' + error);
        response.status(500).json({
            ok: false,
            msg: 'error interno del servidor al actualizar el registro',
        });
    }
}

/**
 * Metodo para la eliminacion de usuarios
 * @param {*Request} request 
 * @param {*Response} response 
 * @returns 
 */
const deleteUser = async(request = Request, response = Response) => {

    const { email } = request.body;
    const status = false;

    try {
        const user = await User.findOneAndUpdate({ email }, status);

        if (user) {
            response.status(201).json({
                ok: true,
                msg: 'Usuario inactivado de manera exitosa',
                data: User
            });
        }

        return response.status(400).json({
            ok: false,
            msg: 'Ubo un problema al momento de inactivar el usuario'
        });

    } catch (error) {
        console.log('Error al eliminar usuarios' + error);
        response.status(500).json({
            ok: false,
            msg: 'error interno del servidor al inactivar el registro',
        });
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
};