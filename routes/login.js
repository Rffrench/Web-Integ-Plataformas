const express = require('express');
const oracledb = require('oracledb');
const router = express.Router();
const dbConfig = require('../dbconfig.js');
const Cliente = require('../models/Cliente.js')
const Usuario = require('../models/Usuario');

let conexion;

router.post('/registerauth', async (req, res, next) => {

    try {
        console.log(req.body);
        cliente = new Cliente(req.body.email, req.body.name);
        console.log(cliente);
        conexion = await oracledb.getConnection(dbConfig);
        const result = await conexion.execute(
            `INSERT INTO Cliente VALUES (:id,:em, :nom)`,
            {
                id: {val:6000},
                em: {val: req.body.email},
                nom: {val: req.body.name}
            }
        );
        console.log(result.rowsAffected);
        res.redirect('/');
    } catch (err) {
        console.error(err);
    } finally {
        conexion.close();
    }
})


router.post('/loginauth', async (req, res, next) => {
    try {
        console.log("Loguendo..")
        usuario = new Usuario(req.body.username, req.body.password);
        conexion = await oracledb.getConnection(dbConfig);
        console.log(usuario)
        const result = await conexion.execute(
            `SELECT * FROM Usuario WHERE username = :x AND password = :y`, 
            {
                x: { val: req.body.username },
                y: { val: req.body.password }
            }
        );
        console.log(result.rowsAffected);

    } catch (err) {
        console.error(err);
    } finally {
        conexion.close();
    }
})





module.exports = router;