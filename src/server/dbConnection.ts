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
		Insert: async (collection: number, data: object) => {
			try {
				await client.db(database).collection(ColName(collection)).insertOne(data)
				console.log('\x1b[32m', `+ Data inserted in collection "${ColName(collection)}"`)
			} catch (err) {
				console.error(err)
			}
		}
	}
	// edit: (collection, id, data) => {

	// },
	// delete: (collection, id) => {

	// },
	// get: (collection, count) => {

	// }
}