/**
 * Reset a lecturer's password by email.
 * Edit EMAIL and NEW_PASSWORD below, then run:
 *   node reset_lecturer.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const LecturerUser = require('./models/lecture_user');

const EMAIL = 'lecturer@seusl.ac.lk'; // ← change to the lecturer's email
const NEW_PASSWORD = 'Lecturer@1234';  // ← change to desired password

mongoose
    .connect(process.env.MONGO_URL, { dbName: 'AttendanceSystem' })
    .then(async () => {
        const hashed = await bcrypt.hash(NEW_PASSWORD, 10);
        const result = await LecturerUser.findOneAndUpdate(
            { email: EMAIL },
            { password: hashed },
            { new: true }
        );
        if (!result) {
            console.log('❌ No lecturer found with email:', EMAIL);
        } else {
            console.log('✅ Password reset for:', result.name);
            console.log('   Email   :', EMAIL);
            console.log('   Password:', NEW_PASSWORD);
        }
        process.exit(0);
    })
    .catch(err => {
        console.error('Error:', err.message);
        process.exit(1);
    });
