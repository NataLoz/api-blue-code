const { response } = require('express');
const Rol = require('../models/Rol')

/**
 * Metodo para listar los roles
 * @param {*Request} request 
 * @param {*Response} response
 * @returns 
 */
const getRol = async(request = Request, response = Response) => {

    try {
        let getRol = await Rol.find();

        if (getRol == false) {
            return response.status(400).json({
                ok: false,
                msg: 'No hay Registros actualmente'
            });
        }

        response.status(200).json({
            ok: true,
            msg: 'Registros encontrados exitosamente',
            data: getRol
        });

    } catch (error) {
        console.log('Error en listar roles' + error);
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
const createRol = async(request = Request, response = Response) => {

    const { typeRol } = request.body;

    try {

        let rol = await Rol.findOne({ typeRol });

        if (rol) {
            return response.status(400).json({
                ok: false,
                msg: 'ya existe un rol registrado con este id'
            });
        }

        rol = new Rol(request.body);

        await rol.save();

        response.status(201).json({
            ok: true,
            msg: 'Rol creado de manera exitosa',
            data: Rol
        });

    } catch (error) {
        console.log('Error al crear rol' + error);
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
const updateRol = async(request = Request, response = Response) => {

    const { typeRol } = request.body;

    try {
        const rol = await Rol.findOneAndUpdate({ typeRol }, request.body);

        if (rol) {
            response.status(201).json({
                ok: true,
                msg: 'Rol actualizado de manera exitosa',
                data: Rol
            });
        }

        return response.status(400).json({
            ok: false,
            msg: 'Ubo un problema al momento de actualizar el rol'
        });

    } catch (error) {
        console.log('Error al actualizar roles' + error);
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
const deleteRol = async(request = Request, response = Response) => {

    const { typeRol } = request.body;
    const status = false;

    try {
        const rol = await User.findOneAndUpdate({ typeRol }, status);

        if (rol) {
            response.status(201).json({
                ok: true,
                msg: 'Rol inactivado de manera exitosa',
                data: Rol
            });
        }

        return response.status(400).json({
            ok: false,
            msg: 'Ubo un problema al momento de inactivar el rol'
        });

    } catch (error) {
        console.log('Error al eliminar roles' + error);
        response.status(500).json({
            ok: false,
            msg: 'error interno del servidor al inactivar el registro',
        });
    }
}

module.exports = {
    getRol,
    createRol,
    updateRol,
    deleteRol
};