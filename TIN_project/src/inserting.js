function insertStudent(req, res, con){
    console.log(req.body);
    let check = "SELECT EXISTS(SELECT * FROM Student WHERE id_Student = " +req.body.id_Student +");";
    con.query(check, function (err, ifExists, fields) {
        if (err) {throw err;}
        else if(ifExists[0]['EXISTS(SELECT * FROM Student WHERE id_Student = '+req.body.id_Student +')']!=0){
            res.send("Record with this id already exists");
        }
        else if(ifExists[0]['EXISTS(SELECT * FROM Student WHERE id_Student = '+req.body.id_Student+')']==0) {
            let nameRegex = /^([a-zA-Z]){2,30}$/;
            let dateRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
            let date = new Date(req.body.date_of_birth);
            let today = new Date();
            let age = today.getFullYear()-date.getFullYear();

            if ((req.body.studentName).match(nameRegex) && (req.body.studentSurname).match(nameRegex)
                &&(req.body.date_of_birth).match(dateRegex)&&(age>=18)) {

                let query = "insert into Student(id_Student, name, surname, date_of_birth) values( \"" + req.body.id_Student + "\",\""
                    + req.body.studentName + "\",\"" + req.body.studentSurname + "\",\'" + req.body.date_of_birth + "\')"
                con.query(query, function (err, result, fields) {
                    if (err) throw err;
                    console.log(result);
                    res.send("Data inserted successfully")
                });
            }
            else{
                if((req.body.studentName).match(nameRegex)){
                    console.log("name matches")
                }
                res.send("Invalid data")
            }
        }
    });
}

function insertProject(req, res, con){
    console.log(req.body);
    let check = "SELECT EXISTS(SELECT * FROM Project WHERE id_Project = " +req.body.id_Project +");";
    let nameRegex = /^.{1,30}$/
    let descriptionRegex = /^.{5,50}$/
    con.query(check, function (err, ifExists, fields) {
        if (err) {throw err;}
        else if(ifExists[0]['EXISTS(SELECT * FROM Project WHERE id_Project = '+req.body.id_Project +')']!=0){
            res.send("Record with this id already exists");
        }
        else if(ifExists[0]['EXISTS(SELECT * FROM Project WHERE id_Project = '+req.body.id_Project+')']==0) {

            if((req.body.projectName).match(nameRegex)&&(req.body.projectDescription).match(descriptionRegex)){
                let query = "insert into Project(id_Project, name, description) values( \"" + req.body.id_Project + "\",\"" + req.body.projectName + "\",\"" + req.body.projectDescription + "\")";

                con.query(query, function (err, result, fields) {
                    if (err) throw err;
                    console.log(result);
                });
                res.send("Data inserted successfully")
            }
            else{
                res.send("Invalid data")
            };
        };
    });
}

function insertStudent_project(req, res, con){
    console.log(req.body);
    let roleRegex = /^.{2,30}$/
    let check = "SELECT EXISTS(SELECT * FROM Student_project WHERE id_Student_project = " +req.body.id_Student_project +");";
    let checkStudent= "SELECT EXISTS(SELECT * FROM Student WHERE id_Student = " +req.body.id_student +");";
    let checkProject= "SELECT EXISTS(SELECT * FROM Project WHERE id_Project = " +req.body.id_project +");";
    let studentChecked;
    let projectChecked;


    con.query(checkStudent, function (err, result, fields) {
        console.log(result)
        if (err) {
            throw err;
        }
        else if (result[0]["EXISTS(SELECT * FROM Student WHERE id_Student = " + req.body.id_student + ")"] == 0) {
            res.send("No such student")
            studentChecked = false;
        }
        else if (result[0]["EXISTS(SELECT * FROM Student WHERE id_Student = " + req.body.id_student + ")"] != 0) {
            studentChecked = true;
        }
    })

    con.query(checkProject, function (err, result, fields) {
        console.log(result)
        if (err) {
            throw err;
        }
        else if (result[0]["EXISTS(SELECT * FROM Project WHERE id_Project = " + req.body.id_project + ")"] == 0) {
            res.send("No such project")
            projectChecked = false;
        }
        else if (result[0]["EXISTS(SELECT * FROM Project WHERE id_Project = " + req.body.id_project + ")"] != 0) {
            projectChecked = true;
        }
    })

    con.query(check, function (err, ifExists, fields) {
        if (err) {
            throw err;
        } else if (ifExists[0]['EXISTS(SELECT * FROM Student_project WHERE id_Student_project = ' + req.body.id_Student_project + ')'] != 0) {
            res.send("Record with this id already exists");
        } else if ((ifExists[0]['EXISTS(SELECT * FROM Student_project WHERE id_Student_project = ' + req.body.id_Student_project + ')'] == 0) && (req.body.role_of_student).match(roleRegex) && Boolean(studentChecked) && Boolean(projectChecked)) {
            let query = "insert into Student_project(id_Student_project, id_student, id_project, role_of_student) values( \" " + req.body.id_Student_project + "\",\" " + req.body.id_student + "\",\" " + req.body.id_project + "\",\"" + req.body.role_of_student + "\")";
            con.query(query, function (err, result, fields) {
                if (err) throw err;
                console.log(result);
            });
            res.send("Data inserted successfully");
            console.log(studentChecked)
        }
    })
}


module.exports = {
    insertStudent,
    insertProject,
    insertStudent_project
}