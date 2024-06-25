const express = require("express")
const bodyParer = require("body-parser");
const request = require("request");
const https = require("https")




const app = express();
app.use(express.static("public"));
app.use(bodyParer.urlencoded({extended: true}))
app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});
app.get("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

  var data = {
    members: [
    {
        email_address:email,
        stetus:"subscibed",
        marge_fields:{
            FNAME: firstName,
            LNAME: lastName,
        }
    }
    
    ]
  };
  var jsonData = JSON.stringify(data)
  const url = "https://us22.api.mailchimp.com/3.0/lists/fd63925b8d"
  const Options = {
    method: "POST",
    auth: "beeresh:e4165c15a59651b8f86c306115cfc2cf-us22"
  }

  const request = https.get(url, Options, function(response){
    response.on("data", function(data){
        console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end()
});

app.listen(3000, function(){
    console.log("Server is running on port 3000")
});

// 694d09e112c18e41599e2073ee3b463c-us22
// fd63925b8d