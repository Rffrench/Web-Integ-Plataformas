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
            `INSERT INTO Cliente (IDCLIENTE,EMAIL,NOMBRE)  VALUES (:id,:em, :nom)`,
            {
                id: {val:101},
                em: {val: req.body.email},
                nom: {val: req.body.name}
            }
        );
        console.log(result.rowsAffected);
        console.log("cliente listo")
    } catch (err) {
        console.error(err);
    } finally {
        conexion.close();
    }

    try {
        conexion = await oracledb.getConnection(dbConfig);
        const result = await conexion.execute(
            `INSERT INTO Usuario (USERNAME,PASSWORD,IDCLIENTE) VALUES ( :usr, :pw, :id)`,
            {
                
                usr: {val: req.body.username},
                pw: {val: req.body.password},
                id: {val:101}
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
            `SELECT idCliente FROM Usuario WHERE username = :x AND password = :y`, 
            {
                x: { val: req.body.username },
                y: { val: req.body.password }
            }
        );
        console.log(parseInt(result.rows));

    } catch (err) {
        console.error(err);
    } finally {
        conexion.close();
    }
})





module.exports = router;