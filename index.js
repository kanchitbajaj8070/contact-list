
const express=require('express');
const path=require('path');
const port=8000;
const db=require('./config/mongoose');
const app=express();
const Contact=require('./models/contact');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());

// app.use((req,res,next)=>{
//     console.log('middleware1 called');
//     next();
// });
// app.use((req,res,next)=>{
//     console.log('middleware2 called');
//     next();
// });

app.get("/",(req,res)=>
{
    Contact.find({/*name:'kunal bajaj'*/},function (error,contactList) {
    if(error)
    {
        console.log('error')
        return;
    }
    return res.render('home',{title:"my contacts list",
        contact_list:contactList});
});
    // res.render('home',{title:"my contacts list",
    //     contact_list:contactList});
    // console.log(req);
    // console.log(res);
    // res.send("send back shit")
});
app.get("/profile",(req,res)=>
{
res.send("<h1> your are in profile page bithc</h1>");
}
);
app.post("/edit-contact/:index",(req,res)=> {
    let id=req.params.index;
    let newContact = {name: String(req.body.edit_name), phone: String(req.body.edit_phone)};
    console.log(id);
    console.log(newContact)
    Contact.findByIdAndUpdate({_id:id},
        {name: String(req.body.edit_name), phone: String(req.body.edit_phone)},
        {new:true},(err)=>{
        if(err){console.log(err)
        return;}
        else
            return res.redirect('back');
        });

});
app.post("/create-contact", (req,res)=> {
    console.log(req.body);
        let newContact = {name: req.body.name, phone: req.body.phone};
        Contact.create({
            name:newContact.name.toLowerCase(),
            phone:newContact.phone.toLowerCase()
        },function (err,newEntry) {
            if(err){
                console.log('error in creating a contact');
            return;
            }
            console.log("*********",newEntry);
            return res.redirect('back');
        })
        //contactList.push(newContact);
       //res.redirect('/');

});
// app.post("/delete-contact", (req,res)=> {
//     console.log();
//     // let newContact={name:req.body.name,phone:req.body.phone};
//     // contactList.push(newContact);
//     return res.redirect('back');
//     //res.redirect('/');
// });
app.listen(port,(error)=>{
    if(error)
    {
        console.log("error ",error);
        return;
    }
    console.log("server is up and running");
});
// app.get('/delete-contact',(req,res)=> {
//     let index=req.query.del;
//     let len=contactList.length;
// contactList.splice(index,1);
// console.log(contactList);
//     res.redirect('back');
// });
app.get('/delete-contact/:index',(req,res)=> {
    Contact.findByIdAndDelete(req.params.index,(error)=>{
        if(error)
        {
            console.log('cannor delete');
            return;
        }
        return res.redirect('back');
    })
// let index=req.params.index;
// let len=contactList.length;
// contactList.splice(index,1);
// console.log(contactList);
// res.redirect('back');
});
