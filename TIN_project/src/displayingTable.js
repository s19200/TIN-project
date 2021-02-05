function displayStudent(req, res, con){
    var query = "select * from Student;"
    con.query(query, function(err, results, fields){
        if(err) throw err;
        res.render("displayingStudent", {userData: results});
    });
    console.log(req.body);
}

function displayProject(req, res, con){
    var query = "select * from Project";
    con.query(query, function(err, results, fields){
        if(err) throw err;
        res.render("displayingProject", {userData:results});
    });
    console.log(req.body);
}

function displayStudent_project(req, res, con){
    var query = "select * from Student_project";
    con.query(query, function(err, results, fields){
        if(err) throw err
        res.render("displayingStudent_project", {userData:results});
        console.log(results)
    });
    console.log(req.body);
}

module.exports= {
    displayStudent,
    displayProject,
    displayStudent_project
}