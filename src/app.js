const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geoCode=require('./utils/geocode')

const app=express()
const port=process.env.PORT || 3000
//Define Paths for Express
const publicDirectoryPath=path.join(__dirname, '../public')
const viewsPath=path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname, '../templates/partials')

//setup handlebars & Views Directory
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Public Directory to Serve Static Contents
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'Nour'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name: 'Nour'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Nour',
        description: 'This is the help page for my Weather App !!!'
    })
})
app.get('/show-weather', (req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'You Must Provide an Address !!'
        })
    }
   const address= req.query.address
   geoCode.geoCode(address, (error,{latitude,longtitude,location}={})=>{
       
    if(error){
        return res.send({
            error:error
        })
    }
   
    geoCode.forCast(latitude,longtitude,(error,forcastData)=>{
        if(error){
            return res.send({
                error:error
            })
        }
        res.send({
            address:address,
            location: location,
            forcast:forcastData
 } )
 } )

})

})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404 Error',
        name:'Nour',
        errorMessage: 'This Help Article Cannot be Found !!!'
    })
})

app.get('/*',(req,res)=>{
    res.render('error',{
        title:'404 Error',
        name:'Nour',
        errorMessage: 'Page Not Found !!!'
    })
})  

app.listen(port, ()=>{
    console.log('Server is up on port '+port)
})