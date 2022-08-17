import { MongoClient, ObjectId } from 'mongodb'
const database = 'Nalbandian'
const client = new MongoClient('mongodb://Ararat:jcu3CV2JXX7u@127.0.0.1:27017/')
const db = client.db(database)

const ColName = (n: number): string => {
	switch (n) {
		case 1:
			return 'Borrowed'
		case 2:
			return 'Members'
		case 3:
			return 'Books'
		default:
			throw ' × Invalid Collection'
	}
}

export const Database = {
	Init: () => {
		console.log('\x1b[36m', '- Initializing database...')
		db.createCollection("Books", (err, res) => {
			if (err) throw err
			db.createCollection("Members", (err, res) => {
				if (err) throw err
				db.createCollection("Borrowed", (err, res) => {
					if (err) throw err
					console.log('\x1b[32m', `+ 3 collections successfully created!`)
					Database.CreateIndexes()
				})
			})
		})
	},
	CreateIndexes: async () => {
		console.log('\x1b[36m', '- Creating Indexes...')
		await db.collection('Books').createIndex({ "$**": "text" }, { language_override: 'l' })
		await db.collection('Members').createIndex({ "$**": "text" }, { language_override: 'l' })
		await db.collection('Borrowed').createIndex({ "$**": "text" }, { language_override: 'l' })
		console.log('\x1b[36m', '- Indexes created!')
		client.close()
	},
	Connect: async (next: Function) => {
		try {
			await client.connect()
			await db.command({ ping: 1 })
			next()
			console.log('\x1b[37m', '- Connected successfully to MongoDB server')
		} catch (err) {
			console.error(err)
		}
	},
	Actions: {
		Insert: async (data: any, callback: Function) => {
			var col = ColName(parseInt(data.collection))
			delete data.collection
			try {
				db.collection(col).insertOne(data, (err, res) => {
					if (err) {
						throw ` × Error inserting document: ${err}`
					} else {
						console.log('\x1b[32m', `+ Data inserted in collection "${col}"`)
						callback(res?.insertedId)
					}
				})
			} catch (err) {
				console.error(`1 Error: ${err}`)
			}
		},
		GetMany: async (num: number, col: number, skip: number, callback: Function) => {
			try {
				callback(await db.collection(ColName(col)).find().sort({ _id: -1 }).skip(--skip).limit(num).toArray())
				console.log('\x1b[32m', `+ ${num} documents retrieved from collection ${ColName(col)}`)
				return true
			} catch (err) {
				console.error(`1 Error: ${err}`)
			}
		},
		GetByQuery: async (query: string, col: number, callback: Function) => {
			try {
				var result = await db.collection(ColName(col)).find({ $text: { $search: query } }).toArray()
				callback(result)
				console.log('\x1b[32m', `+ ${result.length} documents retrieved from collection ${ColName(col)}`)
				return true
			} catch (err) { 
				console.error(`1 Error: ${err}`)
			}
		},
		Delete: async (col: number, id: number, callback: Function) => {
			try {
				db.collection(ColName(col)).deleteOne({ _id: new ObjectId(id) })
				callback(true)
				console.log('\x1b[32m', `+ Document ${id} was deleted from collection ${ColName(col)}`)
				return true
			} catch (err) {
				console.error(`1 Error: ${err}`)
			}
			
		}
	}
	/* edit: (collection, id, data) => {

	},
	delete: (collection, id) => {

	},
	get: (collection, count) => {

	} */
}

// db.collection(ColName(col)).createIndex({ "$**": "text" }, { default_language: "spanish" })