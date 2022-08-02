import express, { Express, Request, Response } from 'express'
const app = express()
const port = 2022

app.get('/', (req, res) => {
	if (process.argv.slice(2)[0] == 'dev') {
		app.set('view engine', 'pug')
		res.render(process.cwd() + '/src/client/views/index.pug')
	} else if (process.argv.slice(2)[0] == '') {
		res.sendFile(__dirname + '/public/index.html')
	}
})

app.use(express.static(process.cwd() + '/public'))
app.use('/jquery', express.static(process.cwd() + '/node_modules/jquery/'))
app.use('/material-icons', express.static(process.cwd() + '/node_modules/material-icons/'))
app.use('/bootstrap', express.static(process.cwd() + '/node_modules/bootstrap/'))

app.listen(port, () => {
	console.log(`App listening on port ${port}`)
})