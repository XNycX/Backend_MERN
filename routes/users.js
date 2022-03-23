const express = require('express');
const router = express.Router();
const { authentication, isAdmin } = require('../middleware/authentication');
const UserController = require('../controllers/UserController');

// http://localhost:5500/users/register (usando un POST).
// Recibe por body un json con los datos de registro de usuario y los guarda en la BBDD
router.post('/register', UserController.register);
router.get('/confirm/:emailToken',UserController.confirmEmail)

//Exporto router para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = router;