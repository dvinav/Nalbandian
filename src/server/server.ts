import express from 'express'
import path from 'path'
import { Connection, InitializeDatabase } from './database'
import { ServerConfig as config, Upload } from './config'
import log from './log'
import * as Request from './api'

const app = express()

const con = new Connection(() => {
	switch (process.argv.slice(2)[0]) {
		case 'init':
			InitializeDatabase(con)
			break
		default:
			init()
			break
	}
})

const init = () => {
	app.use(express.json())

	app.use(express.static(process.cwd() + config.dir.public))

	app.use(config.dir.public, express.static(process.cwd() + config.dir.public))

	app.get(config.routes, (req: any, res: any) => {
		res.sendFile(path.resolve(__dirname + config.indexHTML))
	})

	app.listen(config.port, () => log.appStarted(config.port))

	app.post(config.url.getMany, async (req: any, res: any) => res.send(await Request.GetMany(con, req.body)))

	app.post(config.url.insert, async (req: any, res: any) => res.send(await Request.InsertB(con, req.body)))

	app.post(config.url.getByQuery, async (req: any, res: any) => res.send(await Request.GetByQuery(con, req.body)))

	app.post(config.url.getOne, async (req: any, res: any) => res.send(await Request.GetOne(con, req.body)))

	app.get(config.url.getImage, async (req: any, res: any) => res.sendFile(config.dir.upload + '/' + req.params.filename))

	app.post(config.url.delete, async (req: any, res: any) => res.send(await Request.Delete(con, req.body)))

	app.post(config.url.return, async (req: any, res: any) => res.send(await Request.Return(con, req.body)))

	app.post(config.url.edit, Upload.single('picture'), async (req: any, res: any) => {
		console.log(req?.file?.filename)
		if (req?.file?.filename) req.body.picture = req?.file?.filename
		res.send(await Request.Edit(con, req.body))
	})

	app.post(config.url.upload, Upload.single('picture'), async (req: any, res: any) => {
		console.log(req?.file?.filename)
		if (req?.file?.filename) req.body.picture = req?.file?.filename
		res.send(await Request.Insert(con, req.body))
	})
}
