const express = require('express');
const oracledb = require('oracledb');
const router = express.Router();
const dbConfig = require('../dbconfig.js');

oracledb.autoCommit=true;

let conexion;
console.log("insp");
//Obtiene todos los servicios y retorna un json
router.get("/", async (req, res, next) => {
    res.render('solicitar-inspeccion');
    console.log("Consultando todos los servicios");
    console.log('Conectandose con la base de datos...');
    try {
        //conectarse
        conexion = await oracledb.getConnection(dbConfig);
        console.log(conexion != null ? "Conexión Exitosa" : "Error en la conexión");
        //consulta
        const result = await conexion.execute
            (
                `SELECT * FROM servicio`,
                {
                    //opcional
                    // maxRows: 1
                }
                //MAGIA DE EXPRESS - USA PROMESAS - RETORNA EL JSON.
            ).then(rows => {
                console.log(rows);
                res.render('solicitar-inspeccion', { servicios: rows })
            })
            .catch(err => {
                res.send(err);
            });

        //Informacion de la consulta
    } catch (err) {
        console.error(err);
    } finally {
        conexion.close();

    }
});

router.post('/solicitarinsp', async (req, res, next) => {

    try {
        fecha = new Date();

        console.log(fecha);
        conexion = await oracledb.getConnection(dbConfig);
        const result = await conexion.execute(
            `INSERT INTO Solicitud (VALORINSP,DESCUENTO,IDCLIENTE,FECHASOLICITUD)
            SELECT :va,:dscto, idcliente, :fec
            FROM cliente WHERE ROWNUM = 1 order by idcliente desc`,
            {
                va: { val: req.body.email },
                dscto: { val: req.body.name },
                fec: { val: fecha }
            }
        );
        console.log(result.rowsAffected);
        console.log("solicitud listo")
    } catch (err) {
        console.error(err);
    } finally {
        conexion.close();
    }
});


module.exports = router;
