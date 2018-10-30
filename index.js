var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    db = require('./js/db.js'),
    lodash = require('lodash'),
    auth = require('./js/auth.1.js'),
    jwt = require('jsonwebtoken'),
    secretOrKey = 'padinet',
    config = require('./js/configs.js'),
    query = require('./js/queries');

app.engine('html',require('ejs').renderFile)
app.set('views',path.join(__dirname,'views'))

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
    next()
})
app.use(express.static(__dirname+'views'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.post('/login',(req,res) => {
    email = req.body.email
    password = req.body.password
    console.log("QUERY",query.login({email:req.body.email}))
    db.executeQuery(query.login({email:req.body.email}),result=>{
        _result = result[0]
        lg = auth.login(_result,password)
        if(lg){
            var payload = {id:_result.id,name:_result.username,email:_result.email,defaultRoute:'/fbs'}
            var token = jwt.sign(payload,secretOrKey,{expiresIn:config.jwt.expiresIn})
            console.log('token',token)
            res.send({message:'ok',token:token,defaultRoute:'/fbs'})
        }else{
            res.send({message:'auth error'})
        }
    })
})
app.post('/testlogin',(req,res) => {
    if(req.body.name && req.body.password){
        var name = req.body.name,
            password = req.body.password
        console.log("Data Received",name,password)
    }
    var user = users[lodash.findIndex(users,{name:name})]
    if(!user){
        res.status(401).json({message:'User not found'})
    }else{
    if(user.password === password){
        var payload = {id:user.id,name:user.name,defaultRoute:user.defaultRoute} 
        var token = jwt.sign(payload, secretOrKey)
        console.log("Token",token)
        res.json({message:'ok',token:token,defaultRoute:user.defaultRoute})
    }else{
        res.status('401').json({message:'Password did not match'})
    }}
})
app.post('/changepassword',(req,res) => {
    console.log("Body",req.body)
    db.executeQuery(query.login({email:req.body.email,password:req.body.password}),result => {
        user = result[0]
        console.log("USER",user)
        console.log("req body password",req.body.newpassword)
        user.password = req.body.newpassword
        identity = auth.changePassword(user)
        console.log("NEW PASSWORD",identity.password)
        console.log("QUERY",query.updatePassword({email:req.body.email,password:identity.password,salt:identity.salt}))
        db.executeQuery(query.updatePassword({email:req.body.email,password:identity.password,salt:identity.salt}),result => {
            res.send(result)
        })
    })
})
app.post('/createuser',(req,res) => {
   user = auth.createUser(req.body)
   console.log("BODY",req.body)
   console.log("USER",user)
   db.executeQuery(query.createUser(user),result => {
       res.send(result)
   })
})
app.post('/activateuser',(req,res) => {
    db.executeQuery(query.activateUser(req.body,req.body.active), result => {
        res.send(result)
    })
})
app.get('/islogin/:token', (req,res) => {
    verify = jwt.verify(req.params.token,secretOrKey,(err,data) => {
        if(!err){
            console.log("Verified",data)
            res.send(data)
        }else{
            console.log("Err",err)
            res.send(err)
        }
    })
})
app.get('/getlogin/:token',(req,res) => {
    decoded = jwt.decode(req.params.token,{complete:true})
    console.log("decoded",decoded)
    res.send(decoded)
})
<<<<<<< HEAD
app.get('/gettickets/:offset/:segment',(req,res) => {
    db.executeQuery(query.getTickets({offset:req.params.offset,segment:req.params.segment}), result => {
=======
app.get('/getclients/:orderby/:ordertype/:offset/:segment',(req,res) => {
    db.executeQuery(query.getClients({
        orderby:req.params.orderby,ordertype:req.params.ordertype,offset:req.params.offset,segment:req.params.segment
    }), result => {
>>>>>>> 7e01c4d3a2ccdba24f933e313d8813cc260e4bde
        res.send(result)
    })
})
app.get('/getticketslength', (req,res) => {
    db.executeQuery(query.getTicketsLength(), result => {
        res.send(result)
    })
})
app.post('/searchtickets',(req,res) => {
    db.executeQuery(query.searchTickets(req.body),result => {
        res.send(result)
    })
})
app.get('/deleteticket/:kdticket',(req,res) => {
    db.executeQuery(query.deleteTicket(req.params),result => {
        res.send(result)
    })
})
app.listen(process.env.PORT || 2000)