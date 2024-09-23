const express= require("express");
const cors= require("cors");
const mysql= require("mysql");
const app = express();
app.use(express.json()); 
app.use(cors());

// this is the connection

const db=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "QazMlp@123",
    database: "rohitdb"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1); // Exit process if connection fails
    } else {
        console.log('Connected to MySQL');
    }
});


app.get("/",(req, res) =>{
    const sql= "SELECT * FROM student";
    db.query(sql,(err, data) =>{
        if(err) return res.json("error");
        return res.json(data);
    })
});

app.post("/create", (req, res) => {
    const sql = "INSERT INTO student (`ID`, `namefirst`, `namelast`, `DOB`, `emailID`) VALUES (?)";
    const values = [
        req.body.ID,
        req.body.namefirst,
        req.body.namelast,
        req.body.DOB,
        req.body.emailID
    ];
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: 'Failed to insert data' });
        }
        return res.status(201).json({ message: 'Student added successfully' });
    });
});



app.put("/update/:ID", (req, res) => {
    const sql = "UPDATE student SET `namefirst`=?, `namelast`=?, `DOB`=?, `emailID`=? WHERE `ID`=?";
    const values = [
        req.body.namefirst,
        req.body.namelast,
        req.body.DOB,
        req.body.emailID
    ];
    const id = req.params.ID;

    db.query(sql, [...values, id], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).json({ error: 'Failed to update student' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        return res.status(200).json({ message: 'Student updated successfully' });
    });
});


app.delete("/student/:ID", (req, res) => {
    const sql = "DELETE FROM student WHERE ID= ?";
    
    const ID = req.params.ID;
    db.query(sql,[ID], (err, result) => {
        if (err) {
            console.error('Error deleting data:', err);
            return res.status(500).json({ error: 'Failed to delete student' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        return res.status(200).json({ message: 'Student deleted successfully' });
    });
});

app.listen(8000,(err)=>{
    if(err){
console.log("Error starting server", err);
    }
    else{
        console.log("server running on port 8000");
        console.log("listening");
    }
})

