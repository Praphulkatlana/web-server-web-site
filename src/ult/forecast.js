const request=require('request')
const forecast=(latitude,longitude,location,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=557649434c74562ee5e4eb8655e021a4&query=`+ longitude +`,`+latitude
    request({url,json:true},(err,{body}={})=>{
        if(err){
            callback("error in connection",undefined)
        }else if(body.error){
            callback("error in fetching forecast",undefined)
        }else
        {
            const location_obj=body.location
            var name =location_obj['name']
            if (location_obj['name'] ==null){
                name=location
            }
            callback(undefined,`In `+name+` Current temperature is `+body.current.temperature+` degree`)
        }
    })
}
module.exports=forecast