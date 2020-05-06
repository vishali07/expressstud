const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port= 3000
let Students = [{
    "StudentID": "1",
    "StudentName":"Student A",
    "StudentGrade":"5",
    "Course":"Mean Stack",
    "Location":"Chennai",
    
},
{
    "StudentID": "2",
    "StudentName":"Student B",
    "StudentGrade":"8",
    "Course":"Web development",
    "Location":"Banglore",
   
},
{
    "StudentID": "3",
    "StudentName":"Student C",
    "StudentGrade":"10",
    "Course":"Testing",
    "Location":"Hydrabad",
    
}];
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.get('/Student',(req,res)=>{
    res.json(Students);
});
app.post('/Student',(req,res)=>{
    const Student=req.body;
    console.log(Student);
    Students.push(Student);
    res.json('Student is added to the database');
});
app.get('/Student/:StudentID',(req,res)=>{
    const StudentID=req.params.StudentID;
    for(let Student of Students){
        if(Student.StudentID===StudentID){
            res.json(Student);
            return;
        }
    }
    res.status(404).send('Student not found')
});
app.put('/Student/:StudentID',(req,res)=>{
    const StudentID=req.params.StudentID;
    const newStudent=req.body;
    for(let i=0;i<Students.length;i++){
        let Student=Students[i]
        if(Student.StudentID===StudentID){
            Students[i]=newStudent;
        }
    }
    res.send('Student is edited');
});
app.delete('/Student/:StudentID',(req,res)=>{
    const StudentID=req.params.StudentID;
    Students=Students.filter(i=>{
        if(i.StudentID!==StudentID){
            return true;
        }
        return false;
    });
    res.send('Student is Deleted');
});
app.listen(port,()=>
console.log(`port ${port}!`));