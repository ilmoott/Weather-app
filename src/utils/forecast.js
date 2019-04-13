const request = require('request');

const key = `ecf6c4bb3136bfc0f7f5d59aff292dcb`



const forecast = (latitude, longitude, location, callback)=>{
    const url = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}?units=si`;

    request({url: url, json: true}, (err, res)=>{
        if(err){
            callback('Unable to connect with weather services.', undefined);
        }else if(res.body.error){
            callback('Unable to find the weather for this location.', undefined);
        }else{
            const data = res.body;
            const message = `Today will be ${data.daily.data[0].summary} It's currently ${data.currently.temperature} degrees. There is a ${data.currently.precipProbability} chance of rain.`;
            callback(undefined, {
                forecast: message
            });
        }
        
    });
}


module.exports = forecast;
