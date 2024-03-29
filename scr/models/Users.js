const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
    admin: { type: Number, default: 0}
});

//Cifrar las contraseñas
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

//comparar las contraseñas cifradas
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
