const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/contact_list_db');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'error to connect the db'));

db.once('open',function(){
    console.log('Successfully connected to the DataBase!!!');
});












/*const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contacts_list_db');
  console.log("Connected to db");
}*/