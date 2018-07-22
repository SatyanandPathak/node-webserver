const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();
// Set the templating engine handlebar
app.set('view engine', 'hbs');

// register partials to be used as a common tenplate across our views like header, footer
hbs.registerPartials(__dirname + '/views/partials');

// register helper function to be used in our hbs tenplates
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('upperCase', (text) => {
    return text.toUpperCase();
})


// Middleware to handle request and response before handlers are executed. Kind of like filters
// Without next(), handlers are never executed
app.use((request, response, next) => {
    // if you use this middle ware without next, then the page handlers will never load
    var now = new Date().toString();
    console.log(`${now}. ${request.method} ${request.url}`)

    var log = `${now}. ${request.method} ${request.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log('Unable to append to server.log');
    });
    next();
});

// Page for maintenence
// app.use((request, response, next) => {
//     response.render('maintainence');
// });

// Use static HTML page. Middle ware to serve a static dir
app.use(express.static(__dirname + '/public'))

app.get('/', (request, response) => {

    // response.contentType('application/json')
    // response.send({
    //     name: 'Satyanand',
    //     age:'25'
    // })
    //response.send('<h1>Hello express web server!</h1>');

    response.render('home.hbs', {
        header: 'Home Page',
        title: 'Home',
        welcomeMessage: 'Hello. Welcome to home page'
    });
});



app.get('/about', (request, response) => {
    //response.send('Sample app showing express demo')
    response.render('about.hbs', {
        header:'About Page',
        title: 'About'
    });
});

app.get('/bad', (request, response) => {
    response.send({
        status: '404',
        description: 'Could not retrieve resource'
    })
})

app.listen(2000, () => {
    console.log('Server is up on port 2000');
});