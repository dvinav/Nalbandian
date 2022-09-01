import express, { Express, Request, Response } from 'express'
import * as Database from './dbConnection'
import multer from 'multer'
import path from 'path'

const port = 2022

const app = express()

const routes = ['/', '/borrowed', '/books', '/members']

const multerStorage = multer.diskStorage({
	destination: 'uploads/',
	filename: (req, file, callback) => {
		return callback(null, `${Date.now()}.${file.originalname.split('.').pop()}`)
	},
})

const upload = multer({ storage: multerStorage })

const init = (args: string) => {
	app.use(express.json())
	app.use(express.static(process.cwd() + '/public'))

	switch (args) {
		case 'init':
			Database.Init()
			break
		case 'index':
			Database.CreateIndexes()
			break
		default:
			start()
			break
	}

	app.post('/request', async (req: any, res: any) => {
		switch (req.body.action) {
			case 'getMany':
				Database.Actions.GetMany(req.body.count, req.body.collection, req.body.skip, (data: any) => res.send(data))
				break
			case 'getByQuery':
				Database.Actions.GetByQuery(req.body.query, req.body.collection, (data: any) => res.send(data))
				break
			case 'delete':
				Database.Actions.Delete(req.body.collection, req.body.id, (data: any) => res.send(data))
				break
		}
	})

	app.post('/upload', upload.single('picture'), async (req: any, res: any) => {
		if (req?.file?.filename) req.body.picture = req?.file?.filename
		Database.Actions.Insert(req.body, (data: any) => res.send(data))
	})
}

const start = () => {
	app.get(routes, (req: any, res: any) => {
		res.sendFile(path.resolve(__dirname + '/../../public/index.html'))
	})

	app.listen(port, () => console.log('\x1b[37m', `- app listening on port ${port}`))
}

Database.Connect(() => init(process.argv.slice(2)[0]))
