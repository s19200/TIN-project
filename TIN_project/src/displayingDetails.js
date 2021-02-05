function displayStudentDetails(req, res, con){
    console.log(req.body);
    let query = "select s.name, s.surname, p.Name, p.description from Student s, project p where s.id_Student=" +req.body.detailsOnThis+" and p.id_Project IN (select sp.id_Project from student_project sp where sp.id_student ="+req.body.detailsOnThis+") ;"

    con.query(query, function(err, results, fields){
        if(err) throw err
        res.render("displayingStudentDetail", {userData:results});
    });
    console.log(req.body.detailsOnThis);
}

function displayProjectDetails(req, res, con){
    console.log(req.body);
    let query = "\n" +
        "select p.Name, p.description, s.name, s.surname from Project p, Student s where p.id_Project="+req.body.detailsOnThis+" and s.id_Student IN (select sp.id_Student from Student_project sp where sp.id_project ="+req.body.detailsOnThis+");"
    con.query(query, function(err, results, fields){
        if(err) throw err
        res.render("displayingProjectDetails", {userData:results});
    });
    console.log(req.body.detailsOnThis);
}

function displayStudent_projectDetails(req, res, con){
    console.log(req.body);
    let query = "\n" +
        "select s.name, s.surname, p.Name, p.description, sp.role_of_student from Student s, Project p, student_project sp \n" +
        "where s.id_Student IN (select sp.id_Student from student_project sp where sp.id_Student_Project ="+req.body.detailsOnThis+") \n" +
        "and p.id_project IN (select sp.id_project from Student_project sp where sp.id_Student_Project="+req.body.detailsOnThis+")\n" +
        "and sp.id_Student_Project="+req.body.detailsOnThis+";"
    con.query(query, function(err, results, fields){
        if(err) throw err
        res.render("displayingStudent_projectDetails", {userData:results});
    });
    console.log(req.body.detailsOnThis);
}

module.exports = {
    displayStudentDetails,
    displayProjectDetails,
    displayStudent_projectDetails
}