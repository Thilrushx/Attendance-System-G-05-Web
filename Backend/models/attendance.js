const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    // QR code string that was scanned
    qrCode: { type: String, required: true },
    // Decoded fields from QR
    department: { type: String, required: true },
    academicYear: { type: String, required: true },
    year: { type: String, required: true },
    semester: { type: String, required: true },
    subject: { type: String, required: true },
    // Who scanned (lecturer)
    lecturerId: { type: mongoose.Schema.Types.ObjectId, ref: 'At_admin_lecturer_details', required: true },
    lecturerName: { type: String, required: true },
    lecturerEmail: { type: String, required: true },
    // Session metadata
    sessionDate: { type: Date, default: Date.now },
    duration: { type: String },
    // Students present — array of { studentId, name, email, markedAt }
    students: [
        {
            studentId: { type: String, required: true },
            name: { type: String, required: true },
            email: { type: String, required: true },
            markedAt: { type: Date, default: Date.now },
        }
    ],
}, { timestamps: true });

const Attendance = mongoose.model('At_attendance', AttendanceSchema, 'At_attendance');

module.exports = Attendance;
