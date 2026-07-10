/**
 * Run once to create/reset the admin account:
 *   node seed_admin.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AdminUser = require('./models/admin_user');

const EMAIL = 'admin@seusl.ac.lk';
const PASSWORD = 'Admin@1234';

mongoose
    .connect(process.env.MONGO_URL, { dbName: 'AttendanceSystem' })
    .then(async () => {
        const hashed = await bcrypt.hash(PASSWORD, 10);
        await AdminUser.findOneAndUpdate(
            { email: EMAIL },
            { email: EMAIL, password: hashed },
            { upsert: true, new: true }
        );
        console.log('✅ Admin account ready:');
        console.log('   Email   :', EMAIL);
        console.log('   Password:', PASSWORD);
        process.exit(0);
    })
    .catch(err => {
        console.error('Error:', err.message);
        process.exit(1);
    });
