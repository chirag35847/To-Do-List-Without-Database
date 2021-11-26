const express=require('express');
const bodyParser=require('body-parser');
const date = require(__dirname+"/date.js"); // Using date from our own separate JS file

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs'); 

const newWorks=[];
const workItems=[];

app.get('/',function(req,res){
    res.render("list",{listTitle:date.getDate(),newListItem:newWorks});
});

app.post("/",function(req,res){
    // This is trigerred when we press submit buttom
    let newWork=req.body.newTask;
    if(req.body.list==="Work"){
        workItems.push(newWork);
        res.redirect('/work');
    }
    else{
        newWorks.push(newWork);
        // Saving the value of newWork into variable and redirecting it to get method because we cant do it here
        res.redirect('/');
    }
});

app.listen(3000,function(){
    console.log('Server active on : http://localhost:3000/');
});

app.get("/work",function(req,res){
    res.render("list",{listTitle:"Work List",newListItem:workItems});
});

app.post("/work",function(req,res){ // Trigerred after redirected
    var item=req.body.newTask;
    workItems.push(item); 
    // Saving the value of newWork into variable and redirecting it to get method because we cant do it here
    res.redirect('/work');
});

app.get("/about",function(req,res){
    res.render("about");
});