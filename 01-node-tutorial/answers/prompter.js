const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};
//here's a comment
// here, you could declare one or more variables to store what comes back from the form.
let target = Math.floor(Math.random()*100)+1;
let message = "Guess a number between 1 and 100."
// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body>
  <p>${message}</p>
  <form method="POST">
  <input type="number" name="message" min="1" max="100" required></input>
  <button type="submit">Submit</button>
  </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    let attempts = 0;
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic
      //check if a guess is made
      if (body["message"]) {
        const userGuess = parseInt(body["message"]);
        attempts++;
        //check if user guess is correct
        if(userGuess === target){
          message = `You're right! You guessed it in ${attempts} attempts. Play again?`
          //reset the number
          target = Math.floor(Math.random() *100) + 1; 
        }
        else if(userGuess < target){
          message = "Too low. Try again !";
        }
        else{
          message = "Too high. Try again !";
        }
      }
      else{
        message = "Please enter a valid number.";
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.on("request", (req) => {
  console.log("event received:", req.method, req.url);
});

server.listen(3000);
console.log("The server is listening on port 3000.");
