const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new Schema ({
    email: {
        type: String,
        required: [true,'El email es obligatorio introducirlo'],
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, "Este correo no es válido"],
    },
    password: {
        type: String,
        required: [true,'El password es obligatorio introducirlo'],
    },
    nickname: {
        type: String,
        required: [true,'El nickname es obligatorio introducirlo'],
        unique: true,
        match:[/^([a-zA-Z0-9@*#]{3,15})$/,"Por favor, introduce un nickname válido, como maxímo de 15 carácteres y minimo 3"],
    },
    role: {
        type: String,
        required: true,
        default: "user",
    },
    city: {
        type: String,
        required: false,
        default: ""
    },
    image_path: {
        type: String,
        required: false,
        default: ""
    },
    // followers: {
    //     type: Array,
    //     required: false,
    //     default: []
    // },
    // following: {
    //     type: Array,
    //     required: false,
    //     default: []
    // },
    confirmed: {  
        type: Boolean,
        required: true,
        default: false
    },
    followers: [{ type: ObjectId, ref: 'User' }],
    following: [{ type: ObjectId, ref: 'User' }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;