const express = require('express')
const app = express()
const port = 2022

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.htm')
})

app.use(express.static(__dirname + '/public'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'))
app.use('/mdc', express.static(__dirname + '/node_modules/material-components-web/dist'))
app.use('/material-icons', express.static(__dirname + '/node_modules/material-icons/iconfont'))

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})