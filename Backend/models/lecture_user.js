const mongoose  = require('mongoose');

const LecturerUser  = new mongoose.Schema({
    name: { type: String,required: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    gender: { type: String,required: true },
    faculty: { type: String,required: true },
    department: { type: String,required: true },
    image: { type: String,required: true },
},
    // {collation: { locale: 'en_US', strength: 1 }}
)
const model = mongoose.model('At_admin_lecturer_details',LecturerUser,'At_admin_lecturer_details');

module.exports =  model;