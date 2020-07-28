let express = require('express')
let bodyParser = require('body-parser')
let app = express()
let request = require('request')

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post("/v3/verify", (req, res) => {
    let token = req.body.token
    let ip_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let options = {
        url: `https://www.google.com/recaptcha/api/siteverify?secret=__SECRET__&response=${token}`,
        method: 'POST'
    }

    console.log(JSON.stringify(options))

    request(options, (err, response, body) => {
        if(err){
            console.log("err", err)
            res.end(JSON.stringify({err: err}, null, 4))
        }else if(res.statusCode >= 400){
            console.log("status code", res.statusCode, body);
            res.end(JSON.stringify({ statCode: res.statusCode, body: body}, null ,4))
        }else{
            console.log(body)
            res.end(JSON.stringify(body, null, 4))
        }
    })
})

app.post("/v2/verify/invisible", (req, res) => {
    let token = req.body.token
    let ip_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let options = {
        url: `https://www.google.com/recaptcha/api/siteverify?secret=__SECRET__&response=${token}`,
        method: 'POST'
    }

    console.log(JSON.stringify(options))

    request(options, (err, response, body) => {
        if (err) {
            console.log("err", err)
            res.end(JSON.stringify({ err: err }, null, 4))
        } else if (res.statusCode >= 400) {
            console.log("status code", res.statusCode, body);
            res.end(JSON.stringify({ statCode: res.statusCode, body: body }, null, 4))
        } else {
            console.log(body)
            res.end(JSON.stringify(body, null, 4))
        }
    })
})

app.post("/v2/verify/checkbox", (req, res) => {
    let token = req.body.token
    let ip_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let options = {
        url: `https://www.google.com/recaptcha/api/siteverify?secret=__SECRET__&response=${token}`,
        method: 'POST'
    }

    console.log(JSON.stringify(options))

    request(options, (err, response, body) => {
        if (err) {
            console.log("err", err)
            res.end(JSON.stringify({ err: err }, null, 4))
        } else if (res.statusCode >= 400) {
            console.log("status code", res.statusCode, body);
            res.end(JSON.stringify({ statCode: res.statusCode, body: body }, null, 4))
        } else {
            console.log(body)
            res.end(JSON.stringify(body, null, 4))
        }
    })
})

app.listen(3000, ()=>{
    console.log("started on port 3000")
})