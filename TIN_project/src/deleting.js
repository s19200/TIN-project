function deletingRecord(req, res, con){
    let query;
    let check;
    let id;

    console.log(req.body);
    if(req.body.deleteFromThis==="Student") {
        id= "id_Student";
        check = "SELECT EXISTS(SELECT * FROM Student WHERE id_Student = " + req.body.idOfRecord +");";
        query = "DELETE from Student WHERE id_Student = " + req.body.idOfRecord;
    }
    else if(req.body.deleteFromThis==="Project") {
        id= "id_Project";
        check = "SELECT EXISTS(SELECT * FROM Project WHERE id_Project = " + req.body.idOfRecord +");";
        query = "DELETE from Project WHERE id_Project = " + req.body.idOfRecord;
    }
    else if(req.body.deleteFromThis==="Student_project") {
        id= "id_Student_project";
        check = "SELECT EXISTS(SELECT * FROM Student_project WHERE id_Student_project = " + req.body.idOfRecord +");";
        query = "DELETE from Student_project WHERE id_Student_project = " + req.body.idOfRecord;
    }
    con.query(check, function (err, ifExists, fields) {
        if (err) {
            res.send("This record is referenced in another table")
        } else if (ifExists[0]['EXISTS(SELECT * FROM '+ req.body.deleteFromThis+' WHERE '+id+' = '+req.body.idOfRecord +')']==0) {
            res.send("There is no record with given id");
        } else if (ifExists[0]['EXISTS(SELECT * FROM '+ req.body.deleteFromThis +' WHERE '+id+' = '+req.body.idOfRecord +')']!=0){
            con.query(query, function (err, result, fields) {
                if (err) throw err;
                console.log(result);
                res.send("Data deleted successfully");
            });

        }
    });
}

module.exports = {deletingRecord};