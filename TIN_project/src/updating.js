function updateStudent (req, res, con){
    console.log(req.body);
    let check = "SELECT EXISTS(SELECT * FROM Student WHERE id_Student = " +req.body.updateThisStudent +");";
    let nameRegex = /^([a-zA-Z]){2,30}$/;
    con.query(check, function (err, ifExists, fields) {
        console.log(ifExists[0]);
        if (err) {
            throw err;
        } else if (ifExists[0]['EXISTS(SELECT * FROM Student WHERE id_Student = '+req.body.updateThisStudent +')']==0) {
            res.send("There is no record with given id");
        } else if (ifExists[0]['EXISTS(SELECT * FROM Student WHERE id_Student = '+req.body.updateThisStudent +')']!=0){
            let query;
            if ((req.body.updateName !== "") && (req.body.updateSurname !== "")&&
                ((req.body.updateName).match(nameRegex)&&(req.body.surname).match(nameRegex))) {
                query = "UPDATE Student SET name = \"" + req.body.updateName + "\", surname =\"" + req.body.updateSurname + "\" WHERE id_Student = " + req.body.updateThisStudent + ";";
            }
            else if ((req.body.updateName !== "") && (req.body.updateSurname == "")&&((req.body.updateName).match(nameRegex))) {
                query = "UPDATE Student SET name = \"" + req.body.updateName + "\" WHERE id_Student = " + req.body.updateThisStudent + ";";
            }
            else if ((req.body.updateName == "") && (req.body.updateSurname !== "")&&((req.body.updateName).match(nameRegex))) {
                query = "UPDATE Student SET surname = \"" + req.body.updateSurname + "\" WHERE id_Student = " + req.body.updateThisStudent + ";";
            }

            con.query(query, function (err, result, fields) {
                if (err) throw err;
                console.log(result);
            });

            res.send("Data updated successfully");
        };
    });
}

function updateProject (req, res, con){
    console.log(req.body);
    let check = "SELECT EXISTS(SELECT * FROM Project WHERE id_Project = " +req.body.updateThisProject +");";
    let nameRegex = /^.{1,30}$/
    let descriptionRegex = /^.{5,50}$/
    con.query(check, function (err, ifExists, fields) {
        console.log(ifExists[0]);
        if (err) {
            throw err;
        } else if (ifExists[0]['EXISTS(SELECT * FROM Project WHERE id_Project = '+req.body.updateThisProject +')']==0) {
            res.send("There is no record with given id");
        } else if (ifExists[0]['EXISTS(SELECT * FROM Project WHERE id_Project = '+req.body.updateThisProject +')']!=0){
            let query;
            if((req.body.updateProjectName!=="")&&(req.body.updateProjectDescription!=="")
                &&((req.body.updateProjectName).match(nameRegex)&&(req.body.updateProjectDescription).match(descriptionRegex))){
                query = "UPDATE Project SET name = \"" + req.body.updateProjectName +"\", description =\"" +req.body.updateProjectDescription+ "\" WHERE id_Project = "+req.body.updateThisProject+";";
            }
            else if((req.body.updateProjectName!=="")&&(req.body.updateProjectDescription=="")&&((req.body.updateProjectName).match(nameRegex))){
                query = "UPDATE Project SET name = \"" + req.body.updateProjectName + "\" WHERE id_Project = "+req.body.updateThisProject+";";
            }
            else if((req.body.updateProjectName=="")&&(req.body.updateProjectDescription!=="")&&((req.body.updateProjectDescription).match(descriptionRegex))){
                query = "UPDATE Project SET description = \"" + req.body.updateProjectDescription + "\" WHERE id_Project = "+req.body.updateThisProject+";";
            }

            con.query(query, function (err, result, fields) {
                if (err) throw err;
                console.log(result);
            });

            res.send("Data updated successfully");
        };
    });
}

function updateStudent_project (req, res, con){
    console.log(req.body);
    let check = "SELECT EXISTS(SELECT * FROM Student_project WHERE id_Student_Project = " +req.body.updateThisStudent_project +");";
    let roleRegex = /^.{2,30}$/
    con.query(check, function (err, ifExists, fields) {
        console.log(ifExists[0]);
        if (err) {
            throw err;
        } else if (ifExists[0]['EXISTS(SELECT * FROM Student_project WHERE id_Student_Project = '+req.body.updateThisStudent_project +')']==0) {
            res.send("There is no record with given id");
        } else if (ifExists[0]['EXISTS(SELECT * FROM Student_project WHERE id_Student_Project = '+req.body.updateThisStudent_project +')']!=0){
            if((req.body.roleOfStudent).match(roleRegex)) {

                let query = "UPDATE Student_project SET role_of_student = \"" + req.body.roleOfStudent + "\" WHERE id_Student_Project = " + req.body.updateThisStudent_project + ";";

                con.query(query, function (err, result, fields) {
                    if (err) throw err;
                    console.log(result);
                });
                res.send("Data updated successfully");
            }
        };
    });
}

module.exports = {
    updateStudent,
    updateProject,
    updateStudent_project
}