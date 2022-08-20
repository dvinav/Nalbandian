import express, { Express, Request, Response } from 'express'
import { Database } from './dbConnection'
import multer from 'multer'

const Multer = {
	Storage: multer.diskStorage({
		destination: 'uploads/',
		filename: (req, file, callback) => {
			return callback(null, `${Date.now()}.${file.originalname.split('.').pop()}`)
		}
	})
}

const App: any = {
	Port: 2022,
	Express: express(),
	Upload: multer({ storage: Multer.Storage }),
	Init: (args: string) => {
		App.Express.use(express.json())
		App.Express.use(express.static(process.cwd() + '/public'))

		switch (args) {
			case 'init':
				Database.Init()
				break
			case 'index':
				Database.CreateIndexes()
				break
			default:
				App.Start()
				break
		}

		App.Express.post('/request', async (req: any, res: any) => {
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

		App.Express.post('/upload', App.Upload.single('picture'), async (req: any, res: any) => {
			if (req?.file?.filename) req.body.picture = req?.file?.filename
			Database.Actions.Insert(req.body, (data: any) => res.send(data))
		})
	},
	Start: () => {
		App.Express.get('/', (req: any, res: any) => {
			res.sendFile(__dirname + '../../public/index.html')
		})

		App.Express.listen(App.Port, () => console.log('\x1b[37m', `- App listening on port ${App.Port}`))
	}/*,
	StartDev: () => {
		App.Express.get('/', (req: any, res: any) => {
			console.log('\x1b[36m', '- App started in dev mode')
			App.Express.set('view engine', 'pug')
			res.render(process.cwd() + '/src/client/views/index.pug')
		})

		App.Express.listen(App.Port, () => console.log('\x1b[37m', `- App listening on port ${App.Port}`))
	}*/

}

Database.Connect(() => App.Init(process.argv.slice(2)[0]))

