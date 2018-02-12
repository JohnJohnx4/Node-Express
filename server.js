const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3030;
let id = 2;

var users = [
    {user: "John", id: 0},
    {user: "Ash", id: 1},
];

app.use(bodyParser.json());

app.use(`/`, (req, res, next) => {
    console.log(`REQUEST TYPE: `, req.method);
    next();
});

// * [POST] `/users` This route should save a new user to the server. (This is just in memory and will not persist if you restart the server.)
app.post(`/users`, (req,res) => {
    let user = req.body.user;
    if (!user) {
        res.json({ error: 'Must provide a user'});
        return;
    }
    // if (users.filter(user => {return user.user === userName}) != undefined) {
        //     res.json({ error: 'User already exists!'});
        //     return;
        // }
        users.push({user, id});
        id++;
        res.json({ users });
    });
    
    // * [GET] `/users` This route will return an array of all users.
    app.get('/users', (req, res) => {
    console.log('Get user request');
    res.send(users);
});

// * [GET] `/users/:id` This route will return the user with the matching `id` property.
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    let thename = users.find(user => {return user.id == id}).user;
    res.send(`<h1>Hello ${thename}!</h1>`);
});

// * [GET] `/search?name=<query>` The query parameter passed to this route should specify the name of the user you are searching for.  Return an array of all users whose names match the name provided.  This search should not be case sensitive.
app.get('/search?name=<query>', (req, res) => {
    console.log(query);
});


// * [DELETE] `/users/:id` This route should delete the specified user.
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    let theUser = users.findIndex(user => { return user.id == id });
    users.splice(theUser, 1);
    res.send(users);
});

app.listen(PORT, err => {
    if (err) {
        console.log('Error starting server');
    } else {
        console.log(`App listening on port ${PORT}`);
    }
});