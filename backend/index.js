require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
var qs = require('qs')
const axios = require('axios')

const apiUrl = 'https://api.rawg.io/api/'
const apiKey = process.env.API_KEY


app.get('/games', (request, response) => {
  response.set('Access-Control-Allow-Origin', '*')
  let query = request.query;
  query.key = apiKey;
  let queryString = qs.stringify(query);
  axios(`${ apiUrl }games?${ queryString }&page_size=40`).then(res => {
    response.send(res.data.results)
  })
})

app.get('/game/:id', (request, response) => {
  response.set('Access-Control-Allow-Origin', '*')
  let query = request.query;
  query.key = apiKey;
  let id = request.params.id;
  let queryString = qs.stringify(query);
  axios(`${ apiUrl }games/${ id }?${ queryString }`).then(res => {
    response.send(res.data)
  })
})

app.get('/game-screenshots/:id', (request, response) => {
  response.set('Access-Control-Allow-Origin', '*')
  let query = request.query;
  query.key = apiKey;
  let id = request.params.id;
  let queryString = qs.stringify(query);
  axios(`${ apiUrl }games/${ id }/screenshots?${ queryString }`).then(res => {
    response.send(res.data)
  })
})

app.get('/game-dev-team/:id', (request, response) => {
  response.set('Access-Control-Allow-Origin', '*')
  let query = request.query;
  query.key = apiKey;
  let id = request.params.id;
  let queryString = qs.stringify(query);
  axios(`${ apiUrl }games/${ id }/development-team?${ queryString }`).then(res => {
    response.send(res.data)
  })
})

app.get('/game-series/:id', (request, response) => {
  response.set('Access-Control-Allow-Origin', '*')
  let query = request.query;
  query.key = apiKey;
  let id = request.params.id;
  let queryString = qs.stringify(query);
  axios(`${ apiUrl }games/${ id }/game-series?${ queryString }`).then(res => {
    response.send(res.data)
  })
})

app.get('/platforms', (request, response) => {
    response.set('Access-Control-Allow-Origin', '*')
    let query = request.query;
    query.key = apiKey;
    let queryString = qs.stringify(query);
    axios(`${apiUrl}platforms?${ queryString }`).then(res => {
        response.send(res.data.results)
    })
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})