const {products} = require("../data")

const getProducts = (req,res) => {
    res.json(products);
}

const getProduct = (req,res) => {
    const idToFind = parseInt(req.params.id); 
    const product = products.find((p) => p.id === idToFind);
    if(!product){
        return res.status(404).json({ message: "That product was not found."})
    }
    res.json(product);
}

module.exports = {
    getProducts,
    getProduct,
}