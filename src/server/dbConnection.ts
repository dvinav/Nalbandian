import { MongoClient, ObjectId } from 'mongodb'

namespace Mongo {
	export const Client = new MongoClient('mongodb://Ararat:jcu3CV2JXX7u@127.0.0.1:27017/')
	export const DB = Client.db('Nalbandian')
}

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

export namespace Database {

	export const Init = () => {
		console.log('\x1b[36m', '- Initializing database...')
		Mongo.DB.createCollection("Books", (err, res) => {
			if (err) throw err
			Mongo.DB.createCollection("Members", (err, res) => {
				if (err) throw err
				Mongo.DB.createCollection("Borrowed", (err, res) => {
					if (err) throw err
					console.log('\x1b[32m', `+ 3 collections successfully created!`)
					Database.CreateIndexes()
				})
			})
		})
	}

	export const CreateIndexes = async () => {
		console.log('\x1b[36m', '- Creating Indexes...')
		await Mongo.DB.collection('Books').createIndex({ "$**": "text" }, { language_override: 'l' })
		await Mongo.DB.collection('Members').createIndex({ "$**": "text" }, { language_override: 'l' })
		await Mongo.DB.collection('Borrowed').createIndex({ "$**": "text" }, { language_override: 'l' })
		console.log('\x1b[36m', '- Indexes created!')
		Mongo.Client.close()
	}

	export const Connect = async (next: Function) => {
		try {
			await Mongo.Client.connect()
			await Mongo.DB.command({ ping: 1 })
			next()
			console.log('\x1b[37m', '- Connected successfully to Mongodb server')
		} catch (err) {
			console.error(err)
		}
	}

	export namespace Actions {

		export const Insert = async (data: any, callback: Function) => {
			var col = ColName(parseInt(data.collection))
			delete data.collection
			try {
				Mongo.DB.collection(col).insertOne(data, (err, res) => {
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
		}

		export const GetMany = async (num: number, col: number, skip: number, callback: Function) => {
			try {
				callback(await Mongo.DB.collection(ColName(col)).find().sort({ _id: -1 }).skip(--skip).limit(num).toArray())
				console.log('\x1b[32m', `+ ${num} documents retrieved from collection ${ColName(col)}`)
				return true
			} catch (err) {
				console.error(`1 Error: ${err}`)
			}
		}

		export const GetByQuery = async (query: string, col: number, callback: Function) => {
			try {
				var result = await Mongo.DB.collection(ColName(col)).find({ $text: { $search: query } }).toArray()
				callback(result)
				console.log('\x1b[32m', `+ ${result.length} documents retrieved from collection ${ColName(col)}`)
				return true
			} catch (err) { 
				console.error(`1 Error: ${err}`)
			}
		}
		
		export const Delete = async (col: number, id: number, callback: Function) => {
			try {
				Mongo.DB.collection(ColName(col)).deleteOne({ _id: new ObjectId(id) })
				callback(true)
				console.log('\x1b[32m', `+ Document ${id} was deleted from collection ${ColName(col)}`)
				return true
			} catch (err) {
				console.error(`1 Error: ${err}`)
			}
			
		}
	}
}