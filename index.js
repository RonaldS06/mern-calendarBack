//1- Importaciones necesarias
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')

require('dotenv').config();

//2- Crear el servidor de express
const app = express();

//7- Base de datos
dbConnection();

//8- CORS
app.use(cors())

//3- Directorio público
app.use( express.static('public') );

//6- Lectura y parse del body
app.use( express.json() );

//! ToDo: auth: crear, login, renew(renovar)
//5- Rutas - Middleware
//Todo lo relacionado a autenticación estara en esta ruta.
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//4- Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
