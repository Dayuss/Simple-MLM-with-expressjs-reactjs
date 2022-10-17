const express = require('express')
const app = express()
const port = 3001
const cors = require('cors');
const router = require('./router')

const errorResponder = (error, request, response, next) => {
    response.header("Content-Type", 'application/json')

    const status = error.status || 400
    response.status(status).send(error.message)
}


app.use(cors());
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
app.use(router);
app.use(errorResponder)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})