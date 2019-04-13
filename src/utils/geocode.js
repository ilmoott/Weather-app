const request = require('request');

const key =`pk.eyJ1IjoiaWxtb290dCIsImEiOiJjanVkZnN2ZWUwaDVtNDNtcWl4ZHdqMmwwIn0.kbK0tyvY68iQC3QXRPzyYg`;

const geocode = (address, callback)=>{
    //the callback asks for an error and an object
    
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${key}&limit=1`;
    
    request({url: url, json: true}, (err, res)=>{
        if(err){
            callback('Unable to connect to location services.', undefined);
        }else if(res.body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined);
        }else{
            const data = res.body;
            const longitude = data.features[0].center[0];
            const latitude = data.features[0].center[1];
        
            callback(undefined,{
                latitude: latitude,
                longitude: longitude,
                location: data.features[0].place_name
            });
        }
    });
};

// geocode('Brisbane', (error, data)=>{
//     error ? console.log(error):console.log(data);
// });

module.exports = geocode;