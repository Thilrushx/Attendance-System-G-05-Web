const mongoose  = require('mongoose');

const AdminUser  = new mongoose.Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
},
    // {collation: { locale: 'en_US', strength: 1 }}
)
const model = mongoose.model('At_admin',AdminUser,'At_admin');

module.exports =  model;