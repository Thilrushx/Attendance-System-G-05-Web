/**
 * Seed script — populates the database with:
 *   - 1 admin account
 *   - 8 lecturers
 *   - 40 students spread across years / semesters
 *
 * Run once from the Backend folder:
 *   node seed_data.js
 *
 * Safe to re-run — uses upsert so it won't create duplicates.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminUser    = require('./models/admin_user');
const LecturerUser = require('./models/lecture_user');
const Student      = require('./models/student');

// ── Seed data ────────────────────────────────────────────────────────────────

const ADMIN = {
    email:    'admin@seusl.ac.lk',
    password: 'Admin@1234',
};

const LECTURERS = [
    {
        name: 'Dr. Amara Perera',
        email: 'amara.perera@seusl.ac.lk',
        password: 'Lec@1234',
        gender: 'female',
        faculty: 'FOT',
        department: 'ICT',
        image: 'https://randomuser.me/api/portraits/women/11.jpg',
    },
    {
        name: 'Mr. Kamal Fernando',
        email: 'kamal.fernando@seusl.ac.lk',
        password: 'Lec@1234',
        gender: 'male',
        faculty: 'FOT',
        department: 'ICT',
        image: 'https://randomuser.me/api/portraits/men/12.jpg',
    },
    {
        name: 'Ms. Nirosha Silva',
        email: 'nirosha.silva@seusl.ac.lk',
        password: 'Lec@1234',
        gender: 'female',
        faculty: 'FOT',
        department: 'ICT',
        image: 'https://randomuser.me/api/portraits/women/13.jpg',
    },
    {
        name: 'Dr. Rajan Krishnan',
        email: 'rajan.krishnan@seusl.ac.lk',
        password: 'Lec@1234',
        gender: 'male',
        faculty: 'FOT',
        department: 'ICT',
        image: 'https://randomuser.me/api/portraits/men/14.jpg',
    },
    {
        name: 'Ms. Fathima Nusrath',
        email: 'fathima.nusrath@seusl.ac.lk',
        password: 'Lec@1234',
        gender: 'female',
        faculty: 'FOT',
        department: 'ICT',
        image: 'https://randomuser.me/api/portraits/women/15.jpg',
    },
    {
        name: 'Mr. Dinesh Wickrama',
        email: 'dinesh.wickrama@seusl.ac.lk',
        password: 'Lec@1234',
        gender: 'male',
        faculty: 'FOT',
        department: 'ICT',
        image: 'https://randomuser.me/api/portraits/men/16.jpg',
    },
    {
        name: 'Dr. Priya Chandran',
        email: 'priya.chandran@seusl.ac.lk',
        password: 'Lec@1234',
        gender: 'female',
        faculty: 'FOT',
        department: 'ICT',
        image: 'https://randomuser.me/api/portraits/women/17.jpg',
    },
    {
        name: 'Mr. Sampath Rathnayake',
        email: 'sampath.rathnayake@seusl.ac.lk',
        password: 'Lec@1234',
        gender: 'male',
        faculty: 'FOT',
        department: 'ICT',
        image: 'https://randomuser.me/api/portraits/men/18.jpg',
    },
];

// 40 students across all 4 years, 2 semesters
const STUDENTS = [
    // ── 1st Year Semester 1 ─────────────────────────────────────────────────
    { name: 'Ashan Madushanka',   studentId: 'ICT/2021/001', email: 'ashan.m@student.seusl.ac.lk',   gender: 'male',   department: 'ICT', faculty: 'FOT', year: '1st Year', semester: '1st Semester', image: 'https://randomuser.me/api/portraits/men/21.jpg' },
    { name: 'Bhavani Perera',     studentId: 'ICT/2021/002', email: 'bhavani.p@student.seusl.ac.lk', gender: 'female', department: 'ICT', faculty: 'FOT', year: '1st Year', semester: '1st Semester', image: 'https://randomuser.me/api/portraits/women/21.jpg' },
    { name: 'Chamith Rodrigo',    studentId: 'ICT/2021/003', email: 'chamith.r@student.seusl.ac.lk', gender: 'male',   department: 'ICT', faculty: 'FOT', year: '1st Year', semester: '1st Semester', image: 'https://randomuser.me/api/portraits/men/22.jpg' },
    { name: 'Dilani Gunasekara',  studentId: 'ICT/2021/004', email: 'dilani.g@student.seusl.ac.lk',  gender: 'female', department: 'ICT', faculty: 'FOT', year: '1st Year', semester: '1st Semester', image: 'https://randomuser.me/api/portraits/women/22.jpg' },
    { name: 'Eranga Jayawardena', studentId: 'ICT/2021/005', email: 'eranga.j@student.seusl.ac.lk',  gender: 'male',   department: 'ICT', faculty: 'FOT', year: '1st Year', semester: '1st Semester', image: 'https://randomuser.me/api/portraits/men/23.jpg' },

    // ── 1st Year Semester 2 ─────────────────────────────────────────────────
    { name: 'Fathima Rizna',      studentId: 'ICT/2021/006', email: 'fathima.r@student.seusl.ac.lk', gender: 'female', department: 'ICT', faculty: 'FOT', year: '1st Year', semester: '2nd Semester', image: 'https://randomuser.me/api/portraits/women/23.jpg' },
    { name: 'Gayan Sampath',      studentId: 'ICT/2021/007', email: 'gayan.s@student.seusl.ac.lk',   gender: 'male',   department: 'ICT', faculty: 'FOT', year: '1st Year', semester: '2nd Semester', image: 'https://randomuser.me/api/portraits/men/24.jpg' },
    { name: 'Hiruni Weerasinghe', studentId: 'ICT/2021/008', email: 'hiruni.w@student.seusl.ac.lk',  gender: 'female', department: 'ICT', faculty: 'FOT', year: '1st Year', semester: '2nd Semester', image: 'https://randomuser.me/api/portraits/women/24.jpg' },
    { name: 'Isuru Bandara',      studentId: 'ICT/2021/009', email: 'isuru.b@student.seusl.ac.lk',   gender: 'male',   department: 'ICT', faculty: 'FOT', year: '1st Year', semester: '2nd Semester', image: 'https://randomuser.me/api/portraits/men/25.jpg' },
    { name: 'Janani Kumari',      studentId: 'ICT/2021/010', email: 'janani.k@student.seusl.ac.lk',  gender: 'female', department: 'ICT', faculty: 'FOT', year: '1st Year', semester: '2nd Semester', image: 'https://randomuser.me/api/portraits/women/25.jpg' },

    // ── 2nd Year Semester 1 ─────────────────────────────────────────────────
    { name: 'Kasun Lakshitha',    studentId: 'ICT/2020/001', email: 'kasun.l@student.seusl.ac.lk',   gender: 'male',   department: 'ICT', faculty: 'FOT', year: '2nd Year', semester: '1st Semester', image: 'https://randomuser.me/api/portraits/men/31.jpg' },
    { name: 'Lakmini Dias',       studentId: 'ICT/2020/002', email: 'lakmini.d@student.seusl.ac.lk', gender: 'female', department: 'ICT', faculty: 'FOT', year: '2nd Year', semester: '1st Semester', image: 'https://randomuser.me/api/portraits/women/31.jpg' },
    { name: 'Malith Senanayake',  studentId: 'ICT/2020/003', email: 'malith.s@student.seusl.ac.lk',  gender: 'male',   department: 'ICT', faculty: 'FOT', year: '2nd Year', semester: '1st Semester', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Nadeesha Abeywickrama', studentId: 'ICT/2020/004', email: 'nadeesha.a@student.seusl.ac.lk', gender: 'female', department: 'ICT', faculty: 'FOT', year: '2nd Year', semester: '1st Semester', image: 'https://randomuser.me/api/portraits/women/32.jpg' },
    { name: 'Osanda Rajapaksha',  studentId: 'ICT/2020/005', email: 'osanda.r@student.seusl.ac.lk',  gender: 'male',   department: 'ICT', faculty: 'FOT', year: '2nd Year', semester: '1st Semester', image: 'https://randomuser.me/api/portraits/men/33.jpg' },

    // ── 2nd Year Semester 2 ─────────────────────────────────────────────────
    { name: 'Piyumi Herath',      studentId: 'ICT/2020/006', email: 'piyumi.h@student.seusl.ac.lk',  gender: 'female', department: 'ICT', faculty: 'FOT', year: '2nd Year', semester: '2nd Semester', image: 'https://randomuser.me/api/portraits/women/33.jpg' },
    { name: 'Qasim Ahamed',       studentId: 'ICT/2020/007', email: 'qasim.a@student.seusl.ac.lk',   gender: 'male',   department: 'ICT', faculty: 'FOT', year: '2nd Year', semester: '2nd Semester', image: 'https://randomuser.me/api/portraits/men/34.jpg' },
    { name: 'Rashmi Jayaratne',   studentId: 'ICT/2020/008', email: 'rashmi.j@student.seusl.ac.lk',  gender: 'female', department: 'ICT', faculty: 'FOT', year: '2nd Year', semester: '2nd Semester', image: 'https://randomuser.me/api/portraits/women/34.jpg' },
    { name: 'Sithum Vithanage',   studentId: 'ICT/2020/009', email: 'sithum.v@student.seusl.ac.lk',  gender: 'male',   department: 'ICT', faculty: 'FOT', year: '2nd Year', semester: '2nd Semester', image: 'https://randomuser.me/api/portraits/men/35.jpg' },
    { name: 'Thilini Dissanayake',studentId: 'ICT/2020/010', email: 'thilini.d@student.seusl.ac.lk', gender: 'female', department: 'ICT', faculty: 'FOT', year: '2nd Year', semester: '2nd Semester', image: 'https://randomuser.me/api/portraits/women/35.jpg' },

    // ── 3rd Year Semester 1 ─────────────────────────────────────────────────
    { name: 'Udara Gamage',       studentId: 'ICT/2019/001', email: 'udara.g@student.seusl.ac.lk',   gender: 'male',   department: 'ICT', faculty: 'FOT', year: '3rd Year', semester: '1st Semester', image: 'https://randomuser.me/api/portraits/men/41.jpg' },
    { name: 'Vindya Liyanage',    studentId: 'ICT/2019/002', email: 'vindya.l@student.seusl.ac.lk',  gender: 'female', department: 'ICT', faculty: 'FOT', year: '3rd Year', semester: '1st Semester', image: 'https://randomuser.me/api/portraits/women/41.jpg' },
    { name: 'Waruna Koswatte',    studentId: 'ICT/2019/003', email: 'waruna.k@student.seusl.ac.lk',  gender: 'male',   department: 'ICT', faculty: 'FOT', year: '3rd Year', semester: '1st Semester', image: 'https://randomuser.me/api/portraits/men/42.jpg' },
    { name: 'Xeniya Farook',      studentId: 'ICT/2019/004', email: 'xeniya.f@student.seusl.ac.lk',  gender: 'female', department: 'ICT', faculty: 'FOT', year: '3rd Year', semester: '1st Semester', image: 'https://randomuser.me/api/portraits/women/42.jpg' },
    { name: 'Yasiru Tennakoon',   studentId: 'ICT/2019/005', email: 'yasiru.t@student.seusl.ac.lk',  gender: 'male',   department: 'ICT', faculty: 'FOT', year: '3rd Year', semester: '1st Semester', image: 'https://randomuser.me/api/portraits/men/43.jpg' },

    // ── 3rd Year Semester 2 ─────────────────────────────────────────────────
    { name: 'Zanele Wickramasinghe', studentId: 'ICT/2019/006', email: 'zanele.w@student.seusl.ac.lk', gender: 'female', department: 'ICT', faculty: 'FOT', year: '3rd Year', semester: '2nd Semester', image: 'https://randomuser.me/api/portraits/women/43.jpg' },
    { name: 'Amila Kumarasiri',   studentId: 'ICT/2019/007', email: 'amila.k@student.seusl.ac.lk',   gender: 'male',   department: 'ICT', faculty: 'FOT', year: '3rd Year', semester: '2nd Semester', image: 'https://randomuser.me/api/portraits/men/44.jpg' },
    { name: 'Buddhika Ranasinghe',studentId: 'ICT/2019/008', email: 'buddhika.r@student.seusl.ac.lk',gender: 'male',   department: 'ICT', faculty: 'FOT', year: '3rd Year', semester: '2nd Semester', image: 'https://randomuser.me/api/portraits/men/45.jpg' },
    { name: 'Chathuri Madawala',  studentId: 'ICT/2019/009', email: 'chathuri.m@student.seusl.ac.lk',gender: 'female', department: 'ICT', faculty: 'FOT', year: '3rd Year', semester: '2nd Semester', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'Dasun Amarasinghe',  studentId: 'ICT/2019/010', email: 'dasun.a@student.seusl.ac.lk',   gender: 'male',   department: 'ICT', faculty: 'FOT', year: '3rd Year', semester: '2nd Semester', image: 'https://randomuser.me/api/portraits/men/46.jpg' },

    // ── 4th Year Semester 1 ─────────────────────────────────────────────────
    { name: 'Erandhi Weeraratne', studentId: 'ICT/2018/001', email: 'erandhi.w@student.seusl.ac.lk', gender: 'female', department: 'ICT', faculty: 'FOT', year: '4th Year', semester: '1st Semester', image: 'https://randomuser.me/api/portraits/women/51.jpg' },
    { name: 'Farhan Cassim',      studentId: 'ICT/2018/002', email: 'farhan.c@student.seusl.ac.lk',  gender: 'male',   department: 'ICT', faculty: 'FOT', year: '4th Year', semester: '1st Semester', image: 'https://randomuser.me/api/portraits/men/51.jpg' },
    { name: 'Geethika Seneviratne', studentId: 'ICT/2018/003', email: 'geethika.s@student.seusl.ac.lk', gender: 'female', department: 'ICT', faculty: 'FOT', year: '4th Year', semester: '1st Semester', image: 'https://randomuser.me/api/portraits/women/52.jpg' },
    { name: 'Hasitha Kodithuwakku', studentId: 'ICT/2018/004', email: 'hasitha.k@student.seusl.ac.lk', gender: 'male', department: 'ICT', faculty: 'FOT', year: '4th Year', semester: '1st Semester', image: 'https://randomuser.me/api/portraits/men/52.jpg' },
    { name: 'Imasha Wijesinghe',  studentId: 'ICT/2018/005', email: 'imasha.w@student.seusl.ac.lk',  gender: 'female', department: 'ICT', faculty: 'FOT', year: '4th Year', semester: '1st Semester', image: 'https://randomuser.me/api/portraits/women/53.jpg' },

    // ── 4th Year Semester 2 ─────────────────────────────────────────────────
    { name: 'Janaka Alwis',       studentId: 'ICT/2018/006', email: 'janaka.a@student.seusl.ac.lk',  gender: 'male',   department: 'ICT', faculty: 'FOT', year: '4th Year', semester: '2nd Semester', image: 'https://randomuser.me/api/portraits/men/53.jpg' },
    { name: 'Kishani Balasuriya', studentId: 'ICT/2018/007', email: 'kishani.b@student.seusl.ac.lk', gender: 'female', department: 'ICT', faculty: 'FOT', year: '4th Year', semester: '2nd Semester', image: 'https://randomuser.me/api/portraits/women/54.jpg' },
    { name: 'Lahiru Pathirana',   studentId: 'ICT/2018/008', email: 'lahiru.p@student.seusl.ac.lk',  gender: 'male',   department: 'ICT', faculty: 'FOT', year: '4th Year', semester: '2nd Semester', image: 'https://randomuser.me/api/portraits/men/54.jpg' },
    { name: 'Mihiri Jayasuriya',  studentId: 'ICT/2018/009', email: 'mihiri.j@student.seusl.ac.lk',  gender: 'female', department: 'ICT', faculty: 'FOT', year: '4th Year', semester: '2nd Semester', image: 'https://randomuser.me/api/portraits/women/55.jpg' },
    { name: 'Naveen Marasinghe',  studentId: 'ICT/2018/010', email: 'naveen.m@student.seusl.ac.lk',  gender: 'male',   department: 'ICT', faculty: 'FOT', year: '4th Year', semester: '2nd Semester', image: 'https://randomuser.me/api/portraits/men/55.jpg' },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function pad(n, width) {
    return String(n).padStart(width, '0');
}

function printSection(title) {
    console.log(`\n${'─'.repeat(50)}`);
    console.log(` ${title}`);
    console.log('─'.repeat(50));
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function seed() {
    await mongoose.connect(process.env.MONGO_URL, { dbName: 'AttendanceSystem' });
    console.log('✅ Connected to AttendanceSystem database\n');

    // ── Admin ──────────────────────────────────────────────────────────────
    printSection('Admin Account');
    const adminHash = await bcrypt.hash(ADMIN.password, 10);
    await AdminUser.findOneAndUpdate(
        { email: ADMIN.email },
        { email: ADMIN.email, password: adminHash },
        { upsert: true, new: true }
    );
    console.log(`  Email    : ${ADMIN.email}`);
    console.log(`  Password : ${ADMIN.password}`);

    // ── Lecturers ──────────────────────────────────────────────────────────
    printSection('Lecturer Accounts  (all passwords: Lec@1234)');
    for (const lec of LECTURERS) {
        const hash = await bcrypt.hash(lec.password, 10);
        await LecturerUser.findOneAndUpdate(
            { email: lec.email },
            { ...lec, password: hash },
            { upsert: true, new: true }
        );
        console.log(`  [${lec.gender === 'male' ? 'M' : 'F'}] ${lec.name.padEnd(28)} ${lec.email}`);
    }

    // ── Students ───────────────────────────────────────────────────────────
    printSection('Students (40 total)');
    let created = 0, skipped = 0;
    for (const stu of STUDENTS) {
        try {
            await Student.findOneAndUpdate(
                { studentId: stu.studentId },
                stu,
                { upsert: true, new: true }
            );
            console.log(`  ${stu.studentId.padEnd(15)} ${stu.name.padEnd(30)} ${stu.year} / ${stu.semester}`);
            created++;
        } catch (err) {
            console.log(`  ⚠️  Skipped ${stu.studentId}: ${err.message}`);
            skipped++;
        }
    }

    // ── Summary ────────────────────────────────────────────────────────────
    printSection('Summary');
    console.log(`  Admin      : 1`);
    console.log(`  Lecturers  : ${LECTURERS.length}`);
    console.log(`  Students   : ${created} seeded, ${skipped} skipped`);
    console.log('\n🎉 Database seeded successfully!\n');

    process.exit(0);
}

seed().catch(err => {
    console.error('Seed failed:', err.message);
    process.exit(1);
});
