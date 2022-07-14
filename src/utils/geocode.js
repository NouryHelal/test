const request=require('postman-request')

const geoCode=(address,callback)=>{

    const mapBoxUrl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoibm91cjc4IiwiYSI6ImNsMmdicHJ4MzAxbjUzY3A5dWlkbDdkNzUifQ.Hx8r3PrXWtn1EeWVsAwSGw&limit=1'
    request({url:mapBoxUrl, json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to Connect to the Mapbox App !! Low Level Error !!',undefined)
        }else if(body.features.length===0){
            callback('Unable to get the Information !!! Error Returned in Response',undefined)
        }else{
            callback(undefined,{
                longtitude:body.features[0].center[0],
                latitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
            }
     })}


//'40.7831,-73.9712'
const forCast=(lat,long,callback)=>{

     urlCoordinates='http://api.weatherstack.com/current?access_key=a99ca7f25926ff3187f1a4fe192c933d&%20query='+lat+','+long
request({url:urlCoordinates, json:true}, (error,{body}={})=>{
    if (error){
        callback('Unable to Connect to the Weather Stack App !! Low Level Error !!',undefined)
    }else if (body.error){
        callback('Unable to get the Information !!! Error Returned in Response',undefined)

    }else{
        // callback(undefined, {
        //     overAll:response.body.current.weather_descriptions[0],
        //     current:response.body.current.temperature,
        //     feelsLike: response.body.current.feelslike
        // })
        callback(undefined,'This Forcast Data was observed @'+body.current.observation_time+'.Overall Weather Description is: '+body.current.weather_descriptions[0]+'.It is currently '+body.current.temperature+' degrees out, and it feels like '+body.current.feelslike)
}})
}

module.exports={
    geoCode:geoCode,
    forCast:forCast
}

    

