


const express = require("express");

const app = express();
const AWS = require("aws-sdk");
const fs = require('fs');


const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());



var multer = require('multer');
var upload = multer({dest:'uploads/'});
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

var upload = multer({ storage: storage })




app.get("/",(req,res,next)=>{
    res.sendFile(__dirname + "/index.html");    
});
var filePath ;
var filename;

app.post("/upload",upload.single("file"),(req,res,next)=>{
    
    console.log(req.file);
    fileName = req.file;
    myname = req.body.n;
    console.log(myname);
    
    // setTimeout(()=>{}, 30000)
    
    filename = fileName ;
    console.log(req.path);
    console.log(req.file);


    res.send("Successful request");
});

// 'uploads/Screenshot 2023-04-06 at 10.51.32 AM.png'

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

filePath = ""+"uploads/Screenshot 2023-04-06 at 10.51.32 AM.png";
const fileContent = fs.readFileSync(filePath);

const params = {
  Bucket: process.env.AWS_BUCKET_NAME,
  Key: `${filename}`,
  Body: fileContent
}

// s3.upload(params, (err, data) => {
//   if (err) {
//     // reject(err)
//     console.log(err);
//   }
// //   resolve(data.Location)
// console.log(data.Location);




app.listen(3000, ()=>{
    console.log("Listening on port 3000");
});