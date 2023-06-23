// BACK-END:

import express from "express";
// import bodyParser from "body-parser"; //its the middleware , we dont need it the current version of express has the functionality
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";
import handleRegister from "./controllers/register.js";
import handleSignin from "./controllers/signin.js";
import handleProfileGet from "./controllers/profile.js";
import {handleImage, handleApiCall} from "./controllers/image.js";


const db = knex({  //connecting to our PostgreSql database
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Keitfysiko2020!',
        database: 'smart-brain'
    }
});

db.select('*').from('users').then(data => { //we dont have to do json since we dont send this info through http
    // console.log(data);
});

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());


app.get("/",(req, res) =>{res.send ('Success');});

app.post("/signin", handleSignin(db,bcrypt));

app.post("/register", (req,res) => {handleRegister(req,res,db,bcrypt)})

app.get("/profile/:id", (req,res) => {handleProfileGet(req,res,db)});

app.put("/image",(req,res) => {handleImage(req,res,db)});

app.post("/imageurl",(req,res) => {handleApiCall(req,res)});
   

app.listen(3000, ()=> { // the second parameter which is a function within this function, it will run right after the 'listen' happens on port 3000.
    console.log('App is running on port 3000')
})

// So now that we have this set up I like planning our API.
// And this is something as a developer you really want to do before you just start coding and you want
// to make sure that you have an idea of what your API design will look like.

//We are gonna test all of this with the aid of POSTMAN.
// --> res = this is working
// signin --> POST = success or fail
// register --> POST =  new user object, that will be added to the server
// profile/:userId (individual to have their own homepage) --> GET = user
// image --> PUT --> user, user already exist and we want to update. To count how many photos the user used to compare with others and get their rank

// (**) Why isn't it reading the email property?
// And I want to show you this error because it happens a lot and it's something that people forget all
// the time.
// Remember when we're sending data from the front-end and it's using JSON, well we need to parse it because
// Express doesn't know what we just sent over; in order to be able to use 'req.body()' well we need
// to use body-parser, don't we?

//bcrypt is a library that is very very powerful.It allows us to create a very secure login.
