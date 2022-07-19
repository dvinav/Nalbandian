import express, { Express, Request, Response } from 'express'
const app = express()
const port = 2022

app.set('view engine', 'pug')

app.get('/', (req, res) => {
	// res.sendFile(__dirname + '/public/index.htm')
	res.render(__dirname + '/src/client/views/index.pug')
})

app.use(express.static(__dirname + '/public'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/'))
app.use('/mdc', express.static(__dirname + '/node_modules/material-components-web/'))
app.use('/material-icons', express.static(__dirname + '/node_modules/material-icons/'))

app.listen(port, () => {
	console.log(`App listening on port ${port}`)
})