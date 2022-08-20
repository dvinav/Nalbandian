import express, { Express, Request, Response } from 'express'
import { Database } from './dbConnection'
import multer from 'multer'

namespace App {
	
	const Port = 2022

	const Express = express()

	namespace Multer {

		const Storage = multer.diskStorage({
			destination: 'uploads/',
			filename: (req, file, callback) => {
				return callback(null, `${Date.now()}.${file.originalname.split('.').pop()}`)
			}
		})

		export const Upload = multer({ storage: Storage })
	}

	export const Init = (args: string) => {
		Express.use(express.json())
		Express.use(express.static(process.cwd() + '/public'))

		switch (args) {
			case 'init':
				Database.Init()
				break
			case 'index':
				Database.CreateIndexes()
				break
			default:
				Start()
				break
		}

		Express.post('/request', async (req: any, res: any) => {
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

		Express.post('/upload', Multer.Upload.single('picture'), async (req: any, res: any) => {
			if (req?.file?.filename) req.body.picture = req?.file?.filename
			Database.Actions.Insert(req.body, (data: any) => res.send(data))
		})
	}

	const Start = () => {
		Express.get('/', (req: any, res: any) => {
			res.sendFile(__dirname + '../../public/index.html')
		})

		Express.listen(Port, () => console.log('\x1b[37m', `- App listening on port ${Port}`))
	}

}

Database.Connect(() => App.Init(process.argv.slice(2)[0]))