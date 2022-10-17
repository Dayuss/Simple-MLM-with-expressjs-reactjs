const axios = require('axios');
const {setupCache} = require('axios-cache-adapter');

const cache = setupCache({
    maxAge: 3 * 60 * 1000 // Three minutes
})

const get = axios.create({
    adapter: cache.adapter,
    baseURL: 'https://pokeapi.co/api/v2'
})

module.exports = get;