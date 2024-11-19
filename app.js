import mysql from "mysql";
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'node_dhaval'
  });


import express from "express";
import multer from 'multer';

var uniquepath = Date.now();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload')
    },
    filename: function (req, file, cb) {
      cb(null, uniquepath + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage }).single('userfile')

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use('/xyz', express.static('upload'))
app.use("/public", express.static("public"));

app.get("/users" , (req,res)=>{
    // res.send("GET ROUTE CALLED")
    connection.query('SELECT * FROM users', function (error, results, fields) {
        if (error){
                 res.status(401).send({msg:error , data:null})
        }
        else{
            res.status(200).send({msg:"success" , data:results})
        }
        
      });
})

app.post("/users" , (req,res)=>{
    // res.send("POST ROUTE CALLED")
    connection.query('INSERT INTO users SET ?', req.body, function (error, results, fields) {
        if (error){
            res.status(401).send({msg:error , data:null})
   }
   else{
       res.status(200).send({msg:"success" , data:results})
   }
});
       
})
app.delete("/users" , (req,res)=>{
    res.send("DELETE ROUTE CALLED")
})
app.put("/users" , (req,res)=>{
    res.send("PUT ROUTE CALLED")
});


app.get("/usershow" , (req,res)=>{
    // res.send("GET ROUTE CALLED")
    connection.query('SELECT * FROM users', function (error, results, fields) {
        if (error){
            console.log(error);
                 res.status(401).send({msg:error , data:null})
        }
        else{
            // res.status(200).send({msg:"success" , data:results})
            console.log(results);
            res.render("showuser.ejs", {data:results});
        }
        
      });
});
app.get("/adduser" , function(req,res){
    res.render("adduserpage.ejs");
});

app.post("/useradd" , (req,res)=>{
    // res.send("POST ROUTE CALLED")
    console.log(req.body);
    connection.query('INSERT INTO users SET ?', req.body, function (error, results, fields) {
        if (error){
            res.status(401).send({msg:error , data:null})
   }
   else{
       res.status(200).send({msg:"success" , data:results})
    // res.redirect("/usershow");
    
   }
});
       
})

app.get("/userform", (req,res)=>{
    res.render('userformpage.ejs')
});

app.post("/file-upload-action", (req, res)=>{
    // console.log('test');
    // console.log(req.body);

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        console.log(err, "Multer Error");

      // A Multer error occurred when uploading.
    } else if (err) {
        console.log(err);
      // An unknown error occurred when uploading.
    }

    var record = {
        ...req.body,
        userfile:req.file.filename
    }
    console.log(record);

    console.log(req.file);
    console.log(req.body);
    // Everything went fine.

    // res.send("File Upload Successfully");

    connection.query('INSERT INTO users SET ?', record, function (error, results, fields) {
        if (error) {
            res.status(401).send({msg:error, data:null})
        }
        else{
            // res.status(200).send({msg:"success", data:results})
            res.redirect('/usershow')
        }
      });
  })
})





app.listen(9000);