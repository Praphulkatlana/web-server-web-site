const reques=require('request')

    const geocode=(address,callback)=>{
        const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicHJhcGh1bCIsImEiOiJja2JsbnY5YXMwZWtuMzFxdDQ0cTB6ZDBqIn0.JMD4fzILGY9DF7qe7QWFpg&limit=1'
        reques({url,json:true},(err,{body}={})=>{
    if(err){callback('Connection issue')}
    else if(body.features.length===0){
        callback('Unable to find location ! try again')
    }else{
        callback(undefined,{
            latitude:body.features[0].geometry.coordinates[0],
            longitude:body.features[0].geometry.coordinates[1],
            location:body.features[0].place_name

        })
    }
        })
    }
    
    module.exports=geocode
