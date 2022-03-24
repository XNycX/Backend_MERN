const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const authConfig = require("../config/auth");
const jwt = require("jsonwebtoken");
const transporter = require("../config/nodemailer");
const UserController = {};

UserController.register = async (req, res) => {
  try {
    if (/^([a-zA-Z0-9@*#]{8,15})$/.test(req.body.password) !== true) {
      return res.send(
        "La contraseña debe tener al menos 8 caracteres y no más de 15 caracteres."
      );
    }
    const hash = bcrypt.hashSync(
      req.body.password,
      Number.parseInt(authConfig.rounds)
    );
    const user = await User.create({
      ...req.body,
      password: hash,
      confirmed: 0,
      role: "user",
    });
    const emailToken = jwt.sign({ email: req.body.email }, authConfig.secret, {
      expiresIn: authConfig.expires,
    });
    console.log(emailToken);
    const url = "http://localhost:5500/users/confirm/" + emailToken;
    await transporter.sendMail({
      to: req.body.email,
      subject: "Confirme su registro en films2022",
      html: `<h3>Bienvenido, estás a un paso de registrarte </h3>
                      <a href="${url}"> Click para confirmar tu registro</a> `,
    });
    res.send(
      `${user.nickname}, Te hemos enviado un correo para confirmar el registro en la web films2022, recuerda revisar tu carpeta SPAM si no ves nuestro correo`
    );
  } catch (error) {
    res.status(400).send(error);
  }
};

(UserController.confirmEmail = async (req, res) => {
  try {
    const token = req.params.emailToken;
    const payload = jwt.verify(token, authConfig.secret);
    await User.findOneAndUpdate({ email: payload.email }, { confirmed: true });
    res.status(201).send("Usuario confirmado con exito");
  } catch (error) {
    console.error(error);
  }
}),
  (UserController.deleteById = async (req, res) => {
    let id = req.body._id;
    try {
      await User.findOneAndRemove(
        { _id: id },
        res.send({ message: `Se ha eliminado el usuario ${id}`, id })
      );
    } catch (error) {
      res.send(error);
    }
  });

UserController.getAllUsers = async (req, res) => {
  try {
    res.json(await User.find());

    // res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

UserController.getUserByNickname = async (req, res) => {
  let nickname = req.body.nickname;
  try {
    res.json(await User.findOne({ nickname }));
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

UserController.following = async (req, res) => {

  let _id = req.body._id

  let id_follower = req.body.follower

  // Enviar Mensaje al usuario que ya sigue a esa persona
  try {
      await User.findOneAndUpdate(
          { _id: _id },
          {
              $push: {
                  followers: {
                      "follower": id_follower
                  }
              }
          }
      )
      res.send("Has Comenzado a seguir a esta persona")

  } catch (error) {
      res.send(error)
  }
};

  UserController.login = (req, res) => {
    let password = req.body.password;
    let email = req.body.email;
    User.findOne({email: req.body.email}).then((User) => {
      if (!User) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }
      const isMatch = bcrypt.compareSync(password, User.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }
      if (!User.confirmed) {
        return res.status(400).send({
          message:
            "Debes confirmar tu correo, recuerda revisar tu carpeta de SPAM si no ves nuestro correo de confirmación",
        });
      }

      token = jwt.sign({ _id: User._id }, authConfig.secret, {
        expiresIn: authConfig.expires,
      });
      res.send({ message: `Bienvenid@ ${User.nickname}, tu token es: ${token}` });
    });
  };


module.exports = UserController;
