const express    = require('express');
const oracledb    = require('oracledb');
const router        = express.Router();
const dbConfig =require('../dbconfig.js') ;

//configuracion datos DB
//la configuracion puede estar en el archivo .env

console.log("Config DB:");	
console.log(dbConfig);

	//Obtiene todos los servicios y retorna un json
	router.get("/", async (req, res, next) => 
	{
		console.log("Consultando todos los servicios");
		console.log('Conectandose con la base de datos...');
	  	try 
		{
		//conectarse
		const conexion = await oracledb.getConnection(dbConfig);
		console.log( conexion != null ? "Conexión Exitosa" : "Error en la conexión");
		//consulta
		const result =  await conexion.execute
		(
			`SELECT * FROM servicio`,
			{
				//opcional
				// maxRows: 1
			}
		//MAGIA DE EXPRESS - USA PROMESAS - RETORNA EL JSON.
		).then(rows => 
			{	
				res.status(200).json(rows);
			})
	  		.catch(err => {
				return
	  		});
		
		//Informacion de la consulta
		console.log(result.rows);
		}catch (err) {
			console.error(err);
		}finally 
  		{
			conexion.close();
	  		
		}		
    });
    
    module.exports = router;

	//obtiene 1 servicio recibiendo la id
	/*
	app.get("/servicios/:idservicio", (req, res, next) => {
		const conexion = await oracledb.getConnection(dbConfig);
		console.log("Consultando el servicio con id="+req.params.idProducto);
		conexion.query("SELECT * FROM servicio where id= ?", [req.params.idProducto])
		.then(rows => {	
			res.json(rows);
			})
	  .catch(err => {
		return
	  });
	});*/
		