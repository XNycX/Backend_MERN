const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5500;
const router = require('./router');

let corsOptions = {//CONFIGURO OPCIONES DE CORS
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

//Middleware
app.use(express.json()); //PUEDO OBTENER JSON DEL BODY
app.use(cors(corsOptions));  //USO CORS
app.get('/', (req, res) => {res.send('Bienvenidos a Express');});
app.use(router);

const dbconnect = require('./db/dbconnect');
dbconnect();

app.listen(process.env.PORT|| 5500, () => console.log(`Server on port ${PORT}`));