const express = require('express');
const {dbConnection} = require('./database/config');
const cors = require('cors');
require('dotenv').config();
//Crear el servidor de express
const app = express();

app.use(cors());

//Conexion a la base de datos
dbConnection();

//Directorio Publico
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/eventos'));

//Escuchar las peticiones al servidor

app.listen(process.env.PORT, () => {
	console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
