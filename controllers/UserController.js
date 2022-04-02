const User = require('../models/user.js');
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
    const url = "https://mernsocialbackend.herokuapp.com/users/confirm/" + emailToken;
    await transporter.sendMail({
      to: req.body.email,
      subject: "Confirme su registro en la red social",
      html: `<h3>Bienvenido, estás a un paso de registrarte </h3>
                      <a href="${url}"> Click para confirmar tu registro</a> `,
    });
    res.send(
      `${user.nickname}, Te hemos enviado un correo para confirmar el registro en la web de la red social, recuerda revisar tu carpeta SPAM si no ves nuestro correo`
    );
  } catch (error) {
    res.status(400).send(error);
  }
};

UserController.confirmEmail = async (req, res) => {
  try {
    const token = req.params.emailToken;
    const payload = jwt.verify(token, authConfig.secret);
    await User.findOneAndUpdate({ email: payload.email }, { confirmed: true });
    res.status(201).send("Usuario confirmado con exito");
  } catch (error) {
    console.error(error);
  }
};
UserController.deleteById = async (req, res) => {
  let _id = req.params._id;
  try {
    await User.findOneAndRemove(
      { _id: _id },
      res.send({ message: `Se ha eliminado el usuario ${_id}`, _id })
    );
  } catch (error) {
    res.send(error);
  }
};

UserController.getAllUsers = async (req, res) => {
  try {
    res.json(await User.find());

    // res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

UserController.getUserByNickname = async (req, res) => {
  const nickname = new RegExp(`${req.params.nickname}`, 'i')
  try {
    const users = await User.aggregate([
      {
          $match: {
            nickname
          }
      }
  ]);
   res.send(users)
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

UserController.getUserInfo = async (req, res) => {
  let _id = req.user._id;
  try {
    res.json(await User.findById(_id ));
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
//Para seguir a otro usuario
UserController.following = async (req, res) => {
  let _id = req.user._id;

  let id_userToFollow = req.body.following;

  // Enviar Mensaje al usuario que ya sigue a esa persona
  try {
    await User.findOneAndUpdate(
      { _id: _id },
      {
        $push: {
          following: id_userToFollow
        },
      }
    );
    res.send("Has Comenzado a seguir a esta persona");
  } catch (error) {
    res.send(error);
  }
};
//Para añadir un seguidor a un usuario
UserController.followers = async (req, res) => {
  let _id = req.user._id;

  let id_follower = req.body.follower;

  // Enviar Mensaje al usuario que ya sigue a esa persona
  try {
    await User.findOneAndUpdate(
      { _id: _id },
      {
        $push: {
         id_follower
        },
      }
    );
    res.send(`Te sigue ${id_follower}`);
  } catch (error) {
    res.send(error);
  }
};
//Para quitar un seguidor a un usuario
UserController.unfollowed = async (req, res) => {
  let _id = req.user._id;

  let id_follower = req.body.follower;

  try {
    await User.findOneAndUpdate(
      { _id: _id },
      {
        $pull: {
          followers: id_follower
        },
      }
    );
    res.send(`Te ha dejado de seguir ${id_follower}.`);
  } catch (error) {
    res.send(error);
  }
};
//Para dejar de seguir a un usuario
UserController.unfollowing = async (req, res) => {
  let _id = req.user._id;

  let id_userToUnfollow = req.body.unfollowing;

  try {
    await User.findOneAndUpdate(
      { _id: _id },
      {
        $pull: {
           id_userToUnfollow
        },
      }
    );
    res.send(`Has dejado de seguir a ${id_userToUnfollow}.`);
  } catch (error) {
    res.send(error);
  }
};
UserController.login = (req, res) => {
  let password = req.body.password;
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res
        .status(400)
        .send({ message: "Usuario o contraseña incorrectos" });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .send({ message: "Usuario o contraseña incorrectos" });
    }
    if (!user.confirmed) {
      return res.status(400).send({
        message:
          "Debes confirmar tu correo, recuerda revisar tu carpeta de SPAM si no ves nuestro correo de confirmación",
      });
    }

    token = jwt.sign({ _id: user._id }, authConfig.secret, {
      expiresIn: authConfig.expires,
    });
    res.send({ message: `Bienvenid@ ${user.nickname}`,token,user });
  });
};
UserController.updateUser = async (req, res) => {
  let id = req.user._id;
  try {
    const users = await User.find();
    const nicknameExist = users.some(user => user.nickname == req.body.nickname)
    if (nicknameExist) {
      const userUpdated= await User.findByIdAndUpdate(id, {
        $set: {
          city: req.body.city,
          image_path: req.body.image_path,
        },
      },
      { new: true })
      res.status(200).json({ msg: "Has modificado tu usuario salvo tu nickname que ya existe",userUpdated });
    } else {
      const userUpdated= await User.findByIdAndUpdate(id, {
         $set: {
           nickname: req.body.nickname,
           city: req.body.city,
           image_path: req.body.image_path,
         },
       },
       { new: true })
       res.status(200).json({ msg: "Has modificado tu usuario",userUpdated });
    }

  } catch (error) {
    res
      .status(500)
      .json({
        msg: `Tu mensaje`,
        error: { name: error.name, message: error.message, detail: error },
      });
  }
};

UserController.updatePassword = (req, res) => {
  let id = req.user._id;

  let oldPassword = req.body.oldPassword;
  let newPassword = req.body.newPassword;
  
  User.findById( id )
    .then((userFound) => {
        if (bcrypt.compareSync(oldPassword, userFound.password)) {
          newPassword = bcrypt.hashSync(
            newPassword,
           +authConfig.rounds
          );
          User.findByIdAndUpdate(id, { password: newPassword},)
            .then((updated) => {
              console.log(updated)
              res.send(updated);
            })
            .catch((error) => {
              res
                .status(401)
                .json({ msg: `Ha ocurrido un error actualizando el password`,error: { name: error.name, message: error.message, detail: error } });
            });
        } else {
          res.status(401).json({ msg: "Usuario o contraseña inválidos" });
        }
    })
    .catch((error) => {
      res.send(error);
    });
};

module.exports = UserController;
