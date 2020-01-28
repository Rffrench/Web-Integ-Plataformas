const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 3003;
const cors = require('cors');
const request = require('request');
const reqprom = require('request-promise'); /* necesario para promesas para llamar a apis */


/* const routes= require('./routes'); */
const login = require('./routes/login'); /* pa la otra usar un solo archivo que tenga las rutas de todos */
const inspeccion = require('./routes/inspeccion');
const servicios = require('./routes/api/servicios');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
	res.render('index');
})

app.get('/login', (req, res, next) => {
	res.render('login');
})

app.get('/solicitar-inspeccion', (req, res, next) => {
	let servicios;

	/* Una llamada a una api que el dato lo pueda cargar al renderizar una plantilla necesita una promesa 
	Se pueden usar callbacks o otras cosas pero lo mejor para llamadas ASYNC es promesas!
	Se uso el paquete request y el request-promise */
	reqprom("http://ec2-3-15-12-67.us-east-2.compute.amazonaws.com:3000/servicios", { json: true })
	.then(function(body){
		servicios=body;
		res.render('solicitar-inspeccion', { servicios: servicios });
	})
	.catch(function(err){
		console.log(err);
	})

});

/* app.all('/*', function(req, res, next) 
	{
		//Headers no seguros, solo de prueba, permite CSRF
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		next();
	}); */

app.use('/', inspeccion.router);
app.use('/', login);
app.use('/api/servicios', servicios)


app.listen(port, () => console.log(`server started on port ${port} `))


/* app.get('/', (req, res)=> { ESTO NO SE USA PORQUE TENDRIA QUE PONERLO PARA CADA SITIO. MEJOR HACER LO DE ARRIBA USANDO STATIC
  res.sendFile(path.join(__dirname, 'public', '/templates/'));
}); */;