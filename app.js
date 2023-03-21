//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const homeStartingContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const aboutContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const contactContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const app = express();
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://admin:Test%40123@cluster0.urlcyfn.mongodb.net/blogsite",{useNewUrlParser:true});

const articleSchema = new mongoose.Schema({
  title:String,
  content:String,
});

const article = mongoose.model("article",articleSchema);


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/",function(req,res){
  article.find({}).then((results)=>{
    res.render("home",{marker:homeStartingContent,articles:results});
  }).catch((err)=>{
    console.log(err);
  })
});

app.get("/about",function(req,res){
  res.render("about",{marker:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{marker:contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  const composeObj= new article({
    title: req.body.title,
    content:req.body.content
  });
  composeObj.save();
  res.redirect("/");
});

app.get("/:day",function(req,res){
  const title = req.params.day;
  article.findOne({title:title}).then((results)=>{
    if(results==null){
      res.render("notfound")
    }
    else{
      res.render("post",{title:title, content: results.content});
    }
  }).catch((err)=>{
    console.log(err);
  })
});


app.listen(1500, function() {
  console.log("Server started on port 3000");
});
