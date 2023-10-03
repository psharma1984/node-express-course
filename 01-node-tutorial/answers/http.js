const http = require('http')

const server = http.createServer((req,res) => {
    if(req.url === '/'){
        res.end("home page")
    }
    else if(req.url === '/about'){
        res.end("about page")
    }
    else{
        res.end(`
        <h1>Oops</h1>
        <p> Page doesn't exists.</p>
        <a href="/">Back Home</a>`
        )
    }
})
server.listen(3000)