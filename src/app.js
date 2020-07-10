const express=require('express')
const path=require('path')
const hbs=require('hbs')
const latlong=require('./ult/latlong')
const forecast=require('./ult/forecast')


const directory=path.join(__dirname,'../Public')
const viewPath=path.join(__dirname,'../templates/views')
const partilPath=path.join(__dirname,'../templates/partials')
const app=express()

app.use(express.static(directory))

app.set('view engine','hbs')
app.set('views',viewPath)  //for custom view path 
hbs.registerPartials(partilPath)

app.get('',(req,resp)=>{
    resp.render('index',{
        title:`World's Weather `,
        name:'Lucky'
    })
})
app.get('/about',(req,resp)=>{
    resp.render('about',{
        title:'About page',
        content:'This page is about the weather',
        name:'Lucky'
    })
})

app.get('/help',(req,resp)=>{
    resp.render('help',{
        title:'Help',
        content:'for any help contact to 7869****58',
        name:'Lucky'
    })
}
)
app.get('/weather',(req,resp)=>{
   if(! req.query.address){
       return resp.send({
           error:'you must provide vaild address term!'
       })
   }
   latlong( req.query.address,(error,{latitude,longitude,location}={})=>{
       if(error){
           return resp.send({error})
       }
       forecast(latitude,longitude,location,(error,data)=>{
           if(error){
               return resp.send({error})
           }

           resp.send({
            forecast:data,
            location,
            address:req.query.address
           })
       })
   })
    // resp.send({
    //     place:req.query.address,
    //     name :'mandsour',
    //     temp:29
    // })
 })

app.get('/help/*',(req,resp)=>{
   resp.render('404',{
       title:'404 ',
       name:'Lucky',
       errorMessage:'Help article not found'

   })
})
app.get('*',(req,resp)=>{
    resp.render('404',{
        title:'404 ',
        name:'Lucky',
        errorMessage:'Page not found'
 
    })
})


// app.get('',(req,resp)=>{
//     resp.send('<h1>Weather</h1>')
// })


app.listen(3000,()=>{
    console.log('server is successfully restarted')
})