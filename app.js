const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const Customer = require('./models/customerschema')
let ejs = require('ejs');
var moment = require('moment');
const path = require("path");
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



 
 
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});


app.use(express.static('public'))
app.set('view engine', 'ejs')


//Contect MogooDB
mongoose.connect("mongodb+srv://rozanashaqqou74:egS8a7vhdzIVeuv1@cluster0.weqxm.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0").then(() => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
 })
 .catch((err) => {
   console.log(err);
 });


//Get Request
 app.get('/' , (req , res ,next)=>{
  Customer.find()
  .then((result)=>{
    res.render('index',{arr : result  , moment : moment} )} )

 .catch(err => {
    console.log(err)
   })
 
  })



app.get('/user/add.html' , (req , res ,next)=>{

 res.render('user/add')
})

app.get('/edit/:id' , (req , res ,next)=>{
  Customer.findById(req.params.id)
.then((result)=>{
 res.render('user/edit',{obj : result} )} )

.catch(err => {
 console.log(err)
})

 }) 
 
app.get('/user/:id' , (req , res ,next)=>{

Customer.findById(req.params.id)
.then((result)=>{
 res.render('user/view',{obj : result  , moment:moment} )} )

.catch(err => {
 console.log(err)
})

})







// Post Request 

app.post('/user/add.html' , (req , res ,next)=>{
  // const { firstname, email } = req.body; // جلب البيانات من الطلب

  // console.log({ firstname , email })
  Customer.create(req.body)
  .then( result => {
    res.redirect("/");
  })
  .catch( err => {
    console.log(err);
  });


})
app.post('/search' , (req , res ,next)=>{
  console.log(req.body.searchTeaxt)
  Customer.find({ $or: [{firstname: "req.body.searchTeaxt"}, {lastname: "req.body.lastname.searchTeaxt"}] })

  .then((result)=>{
    console.log(result)
    res.render('user/search' , {arr : result , moment: moment})} )

 .catch(err => {
    console.log(err)
   })
  




})


//put Request
app.put("/edit/:id", (req, res) => {
  Customer.updateOne({_id: req.params.id}, req.body)
    .then((params) => {
      res.redirect("/");
  });
}); 

//delete Request 


 
app.delete("/delete/:id", (req, res) => {
  console.log("*******")
  Customer.deleteOne({ _id: req.params.id }).then((result) => {
  res.redirect("/");
  });
}); 











