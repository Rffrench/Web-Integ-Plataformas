const express = require('express');
const app= express();
const path = require('path');
const port = process.env.PORT || 3000;
const cors= require('cors');

/* const routes= require('./routes'); */
const login = require('./routes/login');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname , 'public')));

/* app.all('/*', function(req, res, next) 
	{
		//Headers no seguros, solo de prueba, permite CSRF
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		next();
	}); */


/* app.get('/public/login' ,(req,res,next) =>{
	console.log('ss');
})

app.post('/loginauth',function (req,res,next){
	console.log("da");
	res.json(req.body);
}) */


app.use('/', login);




app.listen(port, ()=> console.log(`server started on port ${port} `))


/* app.get('/', (req, res)=> { ESTO NO SE USA PORQUE TENDRIA QUE PONERLO PARA CADA SITIO. MEJOR HACER LO DE ARRIBA USANDO STATIC
  res.sendFile(path.join(__dirname, 'public', '/templates/'));
}); */;