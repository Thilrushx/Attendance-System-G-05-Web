const express = require('express');
const { default: mongoose } = require('mongoose');
const app =  express();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const AdminUser = require('./models/admin_user');
const LecturerUser = require('./models/lecture_user');
const jwt = require('jsonwebtoken');

const MongoURL = 'mongodb+srv://tharindudeshanhimahansa43:TfA6q3iUaaI8Tdw9@atsyscluster0.zzmn1.mongodb.net/?retryWrites=true&w=majority&appName=AtSysCluster0';

app.use(cors());
app.use(express.json())

app.listen(1337,()=>{
    console.log('Server Started on 1337')
});

app.post('/adminlogin',async (req,res)=>{
    try{
        const adminuser =  await AdminUser.findOne({
            email: req.body.email
        });

        if(!adminuser){
            return res.json({status: 'error',error: 'Invalid Login'})
        }

        const isPasswordValid = await bcrypt.compare(req.body.password,adminuser.password);

        if(isPasswordValid){
            const token = jwt.sign({
                email:adminuser.email
            },'secret123')
            return res.json({status:'ok',user: token})
        }
        else{
            return res.json({status:'error',user: false})
        }
    }catch(error){
        console.log("Error while login admin user",error);
    }
});


app.post('/lectureadd',async (req,res)=>{
    try{
        const encryptedpassword = await bcrypt.hash(req.body.password,10);
        await LecturerUser.create({
            name: req.body.name,
            email: req.body.email,
            password: encryptedpassword,
            gender: req.body.gender,
            faculty: req.body.selectedFaculty,
            department: req.body.selectedDepartment,
            image: req.body.image,
        })
        res.json({status:'ok'})
    }catch(error){
        console.log("Error while addinglecturers admin user",error);
    }
});

app.get('/api/lectures',async (req,res)=>{
    const admintoken =  req.headers['x-access-token']
    try{
        // const decoded =  jwt.verify(admintoken,'secret123')
        // const email = decoded.email
        const lecture_user_data = await LecturerUser.find({});
        return res.json({status:'ok',lec_data:lecture_user_data})
    }catch(error){
        console.log(error);
        res.json({status:'error',error:'Invalid token'});
    }
});

app.delete('/deleteLecturer', async(req,res)=>{
    try{
        const id = req.body.id;
        const email =  req.body.email;
        const result = await LecturerUser.findOneAndDelete({ _id: id, email: email });
        if(!result){
            return res.json({status:'not found'})
        }
        else{
            return res.json({status:'ok'})
        }
    }catch(error){
        console.log(error.message);
        return error;
    }
})

//MongoDB Connection
mongoose.connect(MongoURL,{dbName:'AttendanceSystem'}).
then(()=>{
    console.log('Conneted to AttendaceSystem Database')
})
.catch(err=>{
    console.error('MongoDB Connection Error:',err);
})