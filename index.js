const express=require('express');
const path =require('path');
const port=8000;
const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();
var contactList=[
    {
        name:"Rajendra",
        phone:"8989898989"
    },
    {
        name:"Rakesh",
        phone:"8989898989"
    },
    {
        name:"Ram",
        phone:"8989898989"
    }
]

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded()); //parsing middle ware
app.use(express.static('assets'));
//middle ware1
/*app.use(function(req,res,next){
    console.log('mw1 called');
    next();
});*/
app.get('/',function(req,res){
    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in fetching data from DB');
            return;
        }
        console.log(req.body);
        return res.render('home',{
            title:'My Contact page!!',
            contact_list:contacts

        });
    });
})
/*app.get('/',function(req, res){
    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in fetching details from db');
            return;

        }
        return res.render('home',{
            title: 'My Contact List',
            Contact:contacts;
    });
   

  /*return res.render('home',{
    title: 'My Contact List',
    contact_list:contactList


});*/


   /* console.log(req);
    res.send('<h1>Hey Man!! Its Running cool now!!!</h1>')
});
app.get('/profile',function(req,res){
    res.send('<h1>Hey Man!! Its my profile </h1>')
});*/
/////////////////////////////////////////
/*app.get('/',function(req,res){
    Contact.find({},function(err,contacts))
    .then(function() {
        
        return res.render('home',{
            title: 'My Contact List',
            contact_list:contacts
        })
    })
    .catch(function(err) {
        console.log('error in creating a contact!');
        return;
    })

});*/



app.post('/create-contact', function(req,res){
    /*contactList.push({
        name:req.body.name,
        phone:req.body.phone
    });
   contactList.push(req.body);
    return res.redirect('back');//back to same page*/
    //console.log(req.body);
    Contact.create({
        name: req.body.name,
        phone:req.body.phone
    }, function(err,newContact){
        if(err){
            console.log("error in creating a contact");
            return;
        }
        console.log('***********',newContact);
        return res.redirect('back');
    });
   
   
});


/*app.post('/create-contact', function(req, res){
    
    // contactlist.push(req.body);
    // return resp.redirect('back')
    Contact.create({
    name:req.body.name,
    phone:req.body.phone
    },
    function(err,newContact){
        if(err){console.log('error in creating contact');
        return;};

        console.log('********',newContact)
         resp.redirect('back');
    });
    /*Contact.create({                         
        name: req.body.name,
        phone: req.body.phone
     })
     .then(function(newContact) {
         console.log('*******',newContact);
         return resp.redirect('back');
     })
     .catch(function(err) {
         console.log('error in creating a contact!');
         return;
     });

});*/
app.get('/profile',function(req,res){
    return res.render('profile',{
        title:'my profile'
    });
});
app.get('/delete-contact/',function(req,res){
    // get the id
    let id=req.query.id;
    //find the conctact to delete using id 
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            Console.log('error in deleting data from DB');
            return;
        }
        return res.redirect('back');
    });
  
   /* let phone=req.query.phone;
    let contactIndex=contactList.findIndex(contact => contact.phone==phone);
    if(contactIndex!=-1){
        contactList.splice(contactIndex,1);
    }
    return res.redirect('back');*/
});





app.listen(port,function(err){
    if(err){
        console.log("Error in running in server!!",err);
    }
    console.log("Server is running on port:",port);
});