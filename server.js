var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/all_html_files/';

var fs = require('fs');

var data = {}
data.table = []


router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/about",function(req,res){
  res.sendFile(path + "about.html");
});

router.get("/Login",function(req,res){
  res.sendFile(path + "Login.html");
});

//file uploading


var upload=require("express-fileupload");
app.use(upload())
app.get("/upload",function(req,res){
    
 res.sendFile(path+"upload.html");   

  
})



app.post("/",function(req,res)
{
 
    if(req.files)
    {
      //  console.log(req.files)
       var file=req.files.filename;
       var filename=file.name;
       file.mv(__dirname+"/upload/"+filename,function(err){
        if(err)
        {
            
         console.log(err)
         res.send("error occured")
        }
        else
        {
         console.log(err)
         res.send("Done")
            
        }
           
       })
        
        
    }
    
})



const testFolder = './upload/';

router.get("/uploaded",function(req,res){
  //res.sendFile(path + "contact.html");
  //  res.send('Uploaded File List:');
  fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
//res.send(file+',');
var obj={file};
data.table.push(obj)
      
  });
  var json = JSON.stringify(data); 
 res.send('Uploaded File List : '+json);
   console.log(json);
}) 

});

router.get("/contact",function(req,res){
  res.sendFile(path + "contact.html");
  var obj = {
      name:req.query.name,
      email:req.query.email,
       message:req.query.message  
   };
   
  data.table.push(obj)
  var json = JSON.stringify(data); 
  fs.writeFile('User_message.json', json); 
   console.log(obj);
});



app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});
 
