const express = require('express');
const app= express();
const path = require('path');
const Cliente = require('./models/Cliente');
const port = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname , 'public')));
/* app.get('/', (req, res)=> { ESTO NO SE USA PORQUE TENDRIA QUE PONERLO PARA CADA SITIO. MEJOR HACER LO DE ARRIBA USANDO STATIC
  res.sendFile(path.join(__dirname, 'public', '/templates/'));
}); */

app.use('/api/servicios',require('./routes/api/servicios'));



app.post('/auth',(req, res)=>{
    res.redirect('/');
});

app.listen(port, ()=> console.log(`server started on port ${port} `));