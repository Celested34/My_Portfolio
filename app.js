
//set up express
    const express = require('express');
    const app = express();

    //add data.json file
    const { projects } = require('./data.json');

//set up middleware
    app.set('view engine', 'pug');

    app.use('/static',express.static('public'));

//set up routes

    //index route
    app.get('/', (req, res, next) => {
        res.render('index', {projects});
    })
    //about route
    app.get('/about', (req, res, next) => {
        res.render('about')
    })

    //Source - Treehouse Unit 6, Practice Using Data with Pug Templates
    //dynamic project routes
    app.get('/projects/:id', (req, res, next)=> {
        let idProject = req.params.id;
        let project = projects.find( ({ id }) => id === idProject );
        res.render('project', { project });

    })

//Source - Treehouse - Unit 6 Understanding Express Middleware Workshop
//error handlers

    //catch 404 
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
)

    //global error handler 
    app.use((err, req, res, next) =>{
        res.status(err.status|| 500).send(err.message)
        res.send('Theres been an error')
        console.log("Error", err)
    }
    )

//start server    
app.listen(3000, () => {
    console.log("The application is running on localhost:3000!")
})




