var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");
   
mongoose.connect("mongodb://localhost:27017/project", {useNewUrlParser: true});   
app.use(bodyParser.urlencoded({extended: true}));    
app.set("view engine", "ejs");  

var newUserSchema = new mongoose.Schema({
    name: String,
    city: String,
    dob: String,
    contact: String
});



var User = mongoose.model("User", newUserSchema);

// User.create(
//      {
//          name: "Ayan", 
//          city: "bangalore",
//          dob: "20/11/1995",
//             contact: "7259388475"
         
//      },
//      function(err, user){
//       if(err){
//           console.log(err);
//       } else {
//           console.log("NEWLY CREATED CAMPGROUND: ");
//           console.log(user);
//       }
//     });


app.get("/", function(req, res){
        User.find({}, function(err, allUsers){
       if(err){
           console.log(err);
       } else {
          res.render("createUser",{createUser:allUsers});
       }
    });
});

app.post("/", function(req, res){
    var name = req.body.name;
    var city = req.body.city;
    var dob = req.body.dob;
    var contact = req.body.contact;
    var newUser = {name: name, city: city, dob: dob, contact: contact};
    User.create(newUser, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            
            res.redirect("/");
        }
    });
});

app.get("/newuser", function(req, res){
   res.render("newuser"); 
});

app.get("/edit", function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            res.redirect("/");
        } else {
            res.render("edit", {user: foundUser});
        }
    });
});



app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});