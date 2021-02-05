var express = require('express');
var path = require('path');
const app = express();
const bodyParser = require('body-parser');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// establishing a connection to database
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tinproject",
  database: "sys"
});
con.connect();

process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

app.get('/start', function(req, res){
  res.render('start');
})

app.get('/start/insertingStudent', function (req, res){
  res.render('insertingStudent');
})

app.get('/start/insertingProject', function (req, res){
  res.render('insertingProject');
})

app.get('/start/insertingStudent_project', function (req, res){
  res.render('insertingStudent_project');
})

app.get('/start/updatingStudent', function (req, res){
  res.render('updatingStudent');
})

app.get('/start/updatingProject', function (req, res){
  res.render('updatingProject');
})

app.get('/start/updatingStudent_project', function (req, res){
  res.render('updatingStudent_project');
})

app.get('/start/deletingRecord', function(req, res){
res.render('deletingRecord');
});

const insertFunctions = require("./src/inserting");
const updateFunctions = require("./src/updating");
const deleteFunction = require("./src/deleting");
const displayFunctions = require("./src/displayingTable");
const displayDetailsFunction = require("./src/displayingDetails");

app.post('/start/insertingStudent', function(req, res){
  insertFunctions.insertStudent(req, res, con);
});


app.post('/start/insertingProject', function (req, res){
  insertFunctions.insertProject(req, res, con);
});

app.post('/start/insertingStudent_project', function (req, res){
  insertFunctions.insertStudent_project(req, res, con);
});


app.post("/start/updatingStudent", function(req, res) {
  updateFunctions.updateStudent(req, res, con)
});

app.post("/start/updatingProject", function(req, res){
  updateFunctions.updateProject(req, res, con)
});


app.post("/start/updatingStudent_project", function(req, res){
  updateFunctions.updateStudent_project(req, res, con)
});

app.post("/start/deletingRecord", function(req, res){
  deleteFunction.deletingRecord(req, res, con)
});

app.post("/start/displayingStudent", function(req, res){
  displayFunctions.displayStudent(req, res, con)
});

app.post("/start/displayingProject", function(req, res){
  displayFunctions.displayProject(req, res, con)
});

app.post("/start/displayingStudent_project", function(req, res){
  displayFunctions.displayStudent_project(req, res, con)
});

app.post("/start/displayingStudentDetail", function(req, res){
  displayDetailsFunction.displayStudentDetails(req, res, con)
})

app.post("/start/displayingProjectDetails", function(req, res){
  displayDetailsFunction.displayProjectDetails(req, res, con)
})


app.post("/start/displayingStudent_projectDetails", function(req, res){
  displayDetailsFunction.displayStudent_projectDetails(req, res, con)
})


app.listen(3000, ()=> console.log("server is running"))



