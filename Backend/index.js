require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AdminUser = require('./models/admin_user');
const LecturerUser = require('./models/lecture_user');
const Student = require('./models/student');
const Attendance = require('./models/attendance');

const app = express();
const PORT = process.env.PORT || 1337;
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

app.use(cors());
app.use(express.json());

// ─── Middleware: verify JWT ───────────────────────────────────────────────────
function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.json({ status: 'error', error: 'No token provided' });
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        return res.json({ status: 'error', error: 'Invalid token' });
    }
}

// ─── Admin Login ──────────────────────────────────────────────────────────────
app.post('/adminlogin', async (req, res) => {
    try {
        const adminuser = await AdminUser.findOne({ email: req.body.email });
        if (!adminuser) return res.json({ status: 'error', error: 'Invalid Login' });

        const isPasswordValid = await bcrypt.compare(req.body.password, adminuser.password);
        if (isPasswordValid) {
            const token = jwt.sign({ email: adminuser.email, role: 'admin' }, JWT_SECRET);
            return res.json({ status: 'ok', user: token });
        }
        return res.json({ status: 'error', error: 'Invalid Login' });
    } catch (error) {
        console.error('Admin login error:', error);
        res.json({ status: 'error', error: 'Server error' });
    }
});

// ─── Lecturer Login ───────────────────────────────────────────────────────────
app.post('/lecturelogin', async (req, res) => {
    try {
        const lecturer = await LecturerUser.findOne({ email: req.body.email });
        if (!lecturer) return res.json({ status: 'error', error: 'Invalid Login' });

        const isPasswordValid = await bcrypt.compare(req.body.password, lecturer.password);
        if (isPasswordValid) {
            const token = jwt.sign(
                { id: lecturer._id, email: lecturer.email, name: lecturer.name, role: 'lecturer' },
                JWT_SECRET
            );
            return res.json({ status: 'ok', user: token, lecturer: { id: lecturer._id, name: lecturer.name, email: lecturer.email, image: lecturer.image, faculty: lecturer.faculty, department: lecturer.department } });
        }
        return res.json({ status: 'error', error: 'Invalid Login' });
    } catch (error) {
        console.error('Lecturer login error:', error);
        res.json({ status: 'error', error: 'Server error' });
    }
});

// ─── Add Lecturer (Admin) ─────────────────────────────────────────────────────
app.post('/lectureadd', async (req, res) => {
    try {
        const existing = await LecturerUser.findOne({ email: req.body.email });
        if (existing) return res.json({ status: 'error', error: 'Email already exists' });

        const encryptedPassword = await bcrypt.hash(req.body.password, 10);
        await LecturerUser.create({
            name: req.body.name,
            email: req.body.email,
            password: encryptedPassword,
            gender: req.body.gender,
            faculty: req.body.selectedFaculty,
            department: req.body.selectedDepartment,
            image: req.body.image,
        });
        res.json({ status: 'ok' });
    } catch (error) {
        console.error('Add lecturer error:', error);
        res.json({ status: 'error', error: error.message });
    }
});

// ─── Get All Lecturers ────────────────────────────────────────────────────────
app.get('/api/lectures', verifyToken, async (req, res) => {
    try {
        const lecture_user_data = await LecturerUser.find({}, '-password');
        return res.json({ status: 'ok', lec_data: lecture_user_data });
    } catch (error) {
        console.error('Get lectures error:', error);
        res.json({ status: 'error', error: 'Server error' });
    }
});

// ─── Update Lecturer ──────────────────────────────────────────────────────────
app.put('/updateLecturer', verifyToken, async (req, res) => {
    try {
        const { id, name, email, gender, selectedFaculty, selectedDepartment, image } = req.body;
        const update = { name, email, gender, faculty: selectedFaculty, department: selectedDepartment, image };

        if (req.body.password) {
            update.password = await bcrypt.hash(req.body.password, 10);
        }

        const result = await LecturerUser.findByIdAndUpdate(id, update, { new: true, select: '-password' });
        if (!result) return res.json({ status: 'not found' });
        return res.json({ status: 'ok', lecturer: result });
    } catch (error) {
        console.error('Update lecturer error:', error);
        res.json({ status: 'error', error: error.message });
    }
});

// ─── Delete Lecturer ──────────────────────────────────────────────────────────
app.delete('/deleteLecturer', verifyToken, async (req, res) => {
    try {
        const { id, email } = req.body;
        const result = await LecturerUser.findOneAndDelete({ _id: id, email });
        if (!result) return res.json({ status: 'not found' });
        return res.json({ status: 'ok' });
    } catch (error) {
        console.error('Delete lecturer error:', error);
        res.json({ status: 'error', error: error.message });
    }
});

// ─── Add Student ──────────────────────────────────────────────────────────────
app.post('/addStudent', verifyToken, async (req, res) => {
    try {
        const existing = await Student.findOne({ $or: [{ email: req.body.email }, { studentId: req.body.studentId }] });
        if (existing) return res.json({ status: 'error', error: 'Student email or ID already exists' });

        const student = await Student.create({
            name: req.body.name,
            email: req.body.email,
            studentId: req.body.studentId,
            department: req.body.department,
            faculty: req.body.faculty,
            year: req.body.year,
            semester: req.body.semester,
            gender: req.body.gender,
            image: req.body.image,
        });
        res.json({ status: 'ok', student });
    } catch (error) {
        console.error('Add student error:', error);
        res.json({ status: 'error', error: error.message });
    }
});

// ─── Get Students ─────────────────────────────────────────────────────────────
app.get('/api/students', verifyToken, async (req, res) => {
    try {
        const filter = {};
        if (req.query.department) filter.department = req.query.department;
        if (req.query.year) filter.year = req.query.year;
        if (req.query.semester) filter.semester = req.query.semester;
        const students = await Student.find(filter);
        return res.json({ status: 'ok', students });
    } catch (error) {
        console.error('Get students error:', error);
        res.json({ status: 'error', error: 'Server error' });
    }
});

// ─── Record Attendance (lecturer scans QR, marks students) ───────────────────
app.post('/attendance', verifyToken, async (req, res) => {
    try {
        const { qrCode, department, academicYear, year, semester, subject, duration, students } = req.body;
        const lecturerId = req.user.id;
        const lecturer = await LecturerUser.findById(lecturerId, 'name email');
        if (!lecturer) return res.json({ status: 'error', error: 'Lecturer not found' });

        const record = await Attendance.create({
            qrCode, department, academicYear, year, semester, subject, duration,
            lecturerId: lecturer._id,
            lecturerName: lecturer.name,
            lecturerEmail: lecturer.email,
            students: students || [],
        });
        res.json({ status: 'ok', record });
    } catch (error) {
        console.error('Attendance record error:', error);
        res.json({ status: 'error', error: error.message });
    }
});

// ─── Get Attendance Records ───────────────────────────────────────────────────
app.get('/api/attendance', verifyToken, async (req, res) => {
    try {
        const filter = {};
        if (req.query.lecturerId) filter.lecturerId = req.query.lecturerId;
        if (req.query.subject) filter.subject = req.query.subject;
        if (req.query.department) filter.department = req.query.department;
        if (req.query.year) filter.year = req.query.year;
        if (req.query.semester) filter.semester = req.query.semester;

        const records = await Attendance.find(filter).sort({ sessionDate: -1 });
        return res.json({ status: 'ok', records });
    } catch (error) {
        console.error('Get attendance error:', error);
        res.json({ status: 'error', error: 'Server error' });
    }
});

// ─── Get Single Attendance Session ───────────────────────────────────────────
app.get('/api/attendance/:id', verifyToken, async (req, res) => {
    try {
        const record = await Attendance.findById(req.params.id);
        if (!record) return res.json({ status: 'not found' });
        return res.json({ status: 'ok', record });
    } catch (error) {
        console.error('Get attendance by id error:', error);
        res.json({ status: 'error', error: 'Server error' });
    }
});

// ─── MongoDB Connection ───────────────────────────────────────────────────────
mongoose
    .connect(process.env.MONGO_URL, { dbName: 'AttendanceSystem' })
    .then(() => {
        console.log('Connected to AttendanceSystem Database');
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    })
    .catch(err => console.error('MongoDB Connection Error:', err));
