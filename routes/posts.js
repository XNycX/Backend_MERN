const express = require('express');
const router = express.Router();
const { authentication, isAdmin } = require('../middleware/authentication');
const PostController = require('../controllers/PostController');

// http://localhost:5500/posts/create (usando un POST).
// Recibe por body un json con los datos del post y los guarda en la BBDD
router.post('/create',PostController.create);

//Exporto router para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = router;