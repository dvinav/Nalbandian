import { CollectionNumbers } from '@utils/types'
import getCol from './getCol'

const log = {
	serverConnected: () => console.log('\x1b[37m', '- Connected successfully to Mongodb server'),
	createCols: () => console.log('\x1b[36m', '- Creating collections...'),
	colCreated: () => console.log('\x1b[32m', `+ 3 collections successfully created!`),
	createIndexes: () => console.log('\x1b[36m', '- Creating Indexes...'),
	indexCreated: () => console.log('\x1b[36m', '- Indexes created!'),
	appStarted: (port: number) => console.log('\x1b[37m', `- app listening on port ${port}`),
	action: {
		insert: (col: CollectionNumbers) => {
			console.log('\x1b[32m', `+ Data inserted in collection "${col}"`)
		},
		delete: (id: string, col: CollectionNumbers) => {
			console.log('\x1b[32m', `+ Document ${id} was deleted from collection ${getCol(col)}`)
		},
		getMany: (count: number, col: CollectionNumbers) => {
			console.log('\x1b[32m', `+ ${count} documents retrieved from collection ${getCol(col)}`)
		},
		getByQuery: (count: number, col: CollectionNumbers) => {
			console.log('\x1b[32m', `+ ${count} documents retrieved from collection ${getCol(col)}`)
		},
		getOne: (id: string, col: CollectionNumbers) => {
			console.log('\x1b[32m', `+ Document with ID: ${id} retrieved from collection ${getCol(col)}`)
		},
	},
}

export default log
