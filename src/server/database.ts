import log from './log'
import { MongoClient } from 'mongodb'
import { MongoConfig as config } from './config'

const conString = `mongodb://${config.username}:${config.password}@${config.server}:${config.port}/`

const InitializeDatabase = async (con: Connection) => {
	log.createCols()
	await con.db.createCollection('books')
	await con.db.createCollection('members')
	await con.db.createCollection('borrowed')
	log.colCreated()
	log.createIndexes()
	await con.db.collection('books').createIndex({ '$**': 'text' }, { language_override: 'l' })
	await con.db.collection('members').createIndex({ '$**': 'text' }, { language_override: 'l' })
	await con.db.collection('borrowed').createIndex({ '$**': 'text' }, { language_override: 'l' })
	log.indexCreated()
	con.close()
}

class Connection {
	private client = new MongoClient(conString)

	db = this.client.db('Nalbandian')

	private connect = async () => {
		try {
			await this.client.connect()
			await this.db.command({ ping: 1 })
			log.serverConnected()
		} catch (err) {
			console.error(err)
		}
	}

	constructor(next: Function) {
		this.connect().then(() => next())
	}

	close() {
		this.client.close()
	}
}

export { Connection, InitializeDatabase }
