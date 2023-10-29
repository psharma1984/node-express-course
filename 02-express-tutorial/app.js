const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const {products} = require('./data')
const peopleRouter = require('./routes/people')
const productRouter = require('./routes/products')

const logger = (req,res,next) => {
    console.log(req.method, req.url, new Date().toTimeString())
    next()
}

const auth = (req,res,next) => {
    const cookie = req.cookies.name
    if(!cookie){
        return res.status(400).json({message:"unauthorized"})       
    }
    req.user = cookie
    next()
}
app.use(logger)
app.use(express.static('./public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/api/v1/people',peopleRouter)
app.use('/api/v1/products',productRouter)
app.use(cookieParser());

//app.get('/api/v1/people')
app.get('/api/v1/test',(req,res) => {
    res.json({message : "It worked!"});
})

//app.get('/api/v1/products',)

//app.get('/api/v1/products/:productID',)

app.get('/api/v1/query',(req,res) => {
    const {search, limit, maxprice} = req.query
    let newProducts = [...products]
    if (search){
        newProducts = newProducts.filter((p) => p.name.startsWith(search))
    }
    if (limit){
        newProducts = newProducts.slice(0,Number(limit))
    } 
    if(maxprice){
        newProducts = newProducts.filter((p) => p.price < parseFloat(maxprice))
    }
    res.status(200).json(newProducts)   
})

app.post('/logon', (req,res) => {
    const name = req.body.name
    if(!name){
        return res.status(400).json({success:"false", message:"User doesn't exists!!!"})  
    }    
    res.cookie("name", req.body.name);
    return res.status(200).send(`Hello ${name}`)
})

app.delete('/logoff',(req,res) => {
    res.clearCookie("name")
    return res.status(200).json({succes:"true", message:"User is logged off"})  
})

app.get('/test',auth,(req,res) => {
    return res.status(200).json({succes:"true", message:`Welcome : ${req.user}`})  
})
//app.post('/api/v1/people',)
app.all('*',(req,res) => {
    res.send(`<h2>Resourse not found</h2>`)
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000...')
})
