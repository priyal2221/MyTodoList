//jshint esversion :6
const express= require("express");
var items=["Buy Food", "Cook food"];
var workItems=[];
const bodyParser =require("body-parser");
const app= express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    
    var today=new Date();
    var options = {
        weekday: "long",
        day:"numeric",
        month:"long"
    };
    var day = today.toLocaleDateString("en-US",options);
    
    res.render("list", {ListTitle: day,newListItems:items});

});

app.post("/" ,function(req,res){
    console.log(req.body);
    var item=req.body.newItem;
    if(req.body.list==="Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
    
});
app.get("/work", function(req,res){
    res.render("list",{ListTitle:"Work list",newListItems:workItems});
})
app.listen(3000,function(){
    console.log("Server started on 3000");
});