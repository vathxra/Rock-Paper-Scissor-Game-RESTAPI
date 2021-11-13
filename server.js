const express = require("express");
const path = require("path");
const http = require("http");
const userlog = require("./middlewares/userlog.json")

const app = express();
const server = http.createServer(app);
const PUBLIC_DIRECTORY_PATH = path.join(__dirname, "public");

app.use(express.json());
app.set("view engine", "ejs");

app.get("/", (req, res) => 
    res.render("index.ejs")
    );

app.get("/game", (req, res) => {
    res.render("game.ejs")
    }  
    );

app.post("/api/login", (req, res) => {
    const getUser = userlog.find(u => u.username === req.body.username && u.password === req.body.password)
    
    if (!getUser){
        res.status(401)
        res.send("User tidak ditemukan!")
    }else {
        res.status(201)
        res.json(getUser.access_token)
    }
})

app.get("/api/me", (req,res) => {
    const getToken = userlog.find(u => u.access_token === req.body.access_token)

    if(!getToken){
        res.status(401)
        res.send("Unauthorized Token")
    }else{
        res.status(201)
        res.json(getToken)
    }
})

app.get("/ini-error", (req, res) => {
    throw new Error(res.status(500), res.render("505.ejs"))
    })

app.use(express.static(PUBLIC_DIRECTORY_PATH))

app.get('*', function(req, res, next) {
      var err = new Error();
      err.status = 404;
      next(err);
    });

app.use(function(err, req, res, next) {
        res.status(404)
        res.render("404.ejs")
        });

    
server.listen(3000, function(err) {
    console.clear();
    console.log("Listening to Server at http://localhost:3000");
});