const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    studentId: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    faculty: { type: String, required: true },
    year: { type: String, required: true },
    semester: { type: String, required: true },
    gender: { type: String, required: true },
    image: { type: String, default: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
}, { timestamps: true });

const Student = mongoose.model('At_student', StudentSchema, 'At_student');

module.exports = Student;
