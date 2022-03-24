const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, authConfig.secret);
        const user = await User.findById(payload._id);
        if (!user ) {
            res.status(401).send({ message: 'No estas autorizado' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        res.status(500).send({ error, message: 'Ha habido un problema con el token' })
    }
}

const isAdmin = async(req, res, next) => {
    const admins = ['admin'];
    if (!admins.includes(req.user.role)) {
        return res.status(403).send({
            message: 'No tienes permiso de acceso'
        });
    }
    next();
}

module.exports = { authentication, isAdmin }