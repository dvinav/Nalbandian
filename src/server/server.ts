import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import { Database } from './dbConnection'
import multer from 'multer'
const app = express()
const port = 2022
const upload = multer({ dest: 'uploads/' })

Database.Connect().then(() => {
	
	app.get('/', (req, res) => {
		if (process.argv.slice(2)[0] == 'dev') {
			console.log('\x1b[36m', '- App started in dev mode')
			app.set('view engine', 'pug')
			
			res.render(process.cwd() + '/src/client/views/index.pug')
		} else if (process.argv.slice(2)[0] == '') {
			res.sendFile(__dirname + '/public/index.html')
		}
	})

	app.use(bodyParser.json())

	app.post('/request', async (req, res) => {
		switch(req.body.action) {
			case 'add':
				Database.Actions.Insert(parseInt(req.body.collection), req.body.data, function(data: any) {
					res.send(data)
				})
				break
			case 'getMany':
				Database.Actions.GetMany(req.body.count, req.body.collection, req.body.skip, (data: any) => res.send(data))
				break
		}
		
	})

	app.post('/upload', upload.single('picture'), async (req, res) => {
		console.log(req.body.file)
	})

	app.use(express.static(process.cwd() + '/public'))

	app.listen(port, () => {
		console.log('\x1b[37m', `- App listening on port ${port}`)
	})
})

