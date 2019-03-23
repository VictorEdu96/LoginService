const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    permiso: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Permiso", userSchema);