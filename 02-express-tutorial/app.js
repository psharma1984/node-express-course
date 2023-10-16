const express = require('express')
const app = express()
const {products} = require('./data')

app.use(express.static('./public'))

app.get('/api/v1/test',(req,res) => {
    res.json({message : "It worked!"});
})

app.get('/api/v1/products',(req,res) => {
    res.json(products);
})

app.get('/api/v1/products/:productID',(req,res) => {
    const idToFind = parseInt(req.params.productID); 
    const product = products.find((p) => p.id === idToFind);
    if(!product){
        return res.status(404).json({ message: "That product was not found."})
    }
    res.json(product);
})

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

app.post('', (req,res) => {

})

app.all('*',(req,res) => {
    res.send(`<h2>Resourse not found</h2>`)
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000...')
})
