// 1. step load in the environments
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
// 2. Create .env to place the api key and call it down below: 

const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY
const axios = require('axios')
const express = require('express')
const app = express()

// 4. Api is only going to have a single app point and this is going to be our weather end point. 

app.use(express.json())
app.use(express.static('public'))

app.post('/weather', (req, res) => {
    const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${req.body.latitude},${req.body.longitude}?units=auto`
    axios({
        url: url,
        responseType: 'json'
    }).then(data => res.json(data.data.currently))
})

app.listen(3000, () => {
    console.log('Server Started')
})