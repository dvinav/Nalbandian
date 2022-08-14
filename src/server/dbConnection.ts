import { MongoClient } from 'mongodb'
const database = 'Nalbandian'
const client = new MongoClient('mongodb://Ararat:jcu3CV2JXX7u@127.0.0.1:27017/')

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
	Index: {
		1: 0,
		2: 0,
		3: 0
	},
	Connect: async function() {
		try {
			await client.connect()
			await client.db(database).command({ ping: 1 })
			console.log('\x1b[37m', '- Connected successfully to MongoDB server')
		} catch (err) {
			console.error(err)
		}
	},
	Actions: {
		Insert: (collection: number, data: object, callback: any) => {
			client.db(database).collection(ColName(collection)).insertOne(data, (err, res) => {
				if (err) {
					throw ` × Error inserting document: ${err}`
				} else {
					console.log('\x1b[32m', `+ Data inserted in collection "${ColName(collection)}"`)
					callback(res)
				}
			})
		},
		GetMany: async (num: number, col: number, skip: number, callback: any) => {
			// Database.Index[]
			try {
				callback(await client.db(database).collection(ColName(col)).find().sort({ _id: -1 }).skip(--skip).limit(num).toArray())
				console.log('\x1b[32m', `+ ${num} documents retrieved from collection ${ColName(col)}`)
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