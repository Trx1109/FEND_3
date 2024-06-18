// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')

// Start up an instance of app
const app = express()
const port = 3000

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.get("/data", (req, res) => {
    res.send(projectData)
})

app.post("/data", (req, res) => {
    let params = req.body
    projectData = {
        temperature: params.temperature,
        date: params.date,
        content: params.content
    }
    res.send(projectData)
})
const server = app.listen(port, () => { console.log(`running on localhost: ${port}`) })
