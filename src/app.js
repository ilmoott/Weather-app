const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const port = process.env.PORT || 3000;

const app = express();


//Set static directory to serve
app.use(express.static(path.join(__dirname, '../public')));


//Set view engine
app.set('views', path.join(__dirname,'../views'));
app.set('view engine', 'hbs');


//Set path for Express config
const partialsPath = path.join(__dirname, '../views/partials');
hbs.registerPartials(partialsPath);


//routes
app.get('/',(req, res)=>{
    res.render('index.hbs', {
        title: 'Home',
        name: 'Ilmo Ott'
    });
});

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        res.send({
            error: 'You must provide an address.'
        });
    }else{
        const address = req.query.address;
        geocode(address, (error, {latitude, longitude, location}={})=>{
            if(error){
                res.send({error});
            }else{
                forecast(latitude, longitude, location, (error, forData)=>{
                    if(error){
                        return res.send({error});
                    }else{
                        res.send({
                            forecast: forData.forecast,
                            location,
                            address: req.query.address
                        });
                    }
                });
            }
        });        
    }
    
});

app.get('/about',(req, res)=>{
    res.render('about.hbs', {
        title: 'About me',
        name: 'Ilmo Ott'
    });
});

app.get('/help',(req, res)=>{
    res.render('help.hbs', {
        title: 'Help',
        name: 'Ilmo Ott'
    });
});

//catch all for help/ requests
app.get('/help/*',(req, res)=>{
    res.render('error.hbs', {
        message: 'Help page not found.'
    });
});



//404 page
app.get('*', (req, res)=>{
    res.render('404.hbs', {
        message: 'Page not found.'
    });
});


///////////////////////////////


//start the server
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});


