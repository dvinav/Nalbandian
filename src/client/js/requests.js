export const Requests = {
	Delete: (col, id, callback) => {
		fetch('/request', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({
				action: 'delete',
				collection: col,
				id: id
			})
		})
			.then(() => callback(id))
	},
	GetMany: (count, col, skip, callback = () => {}) => {
		fetch('/request', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({
				action: 'getMany',
				count: count,
				collection: col,
				skip: skip
			})
		})
			.then(res => res.json())
			.then(data => callback(data))
	},
	Add: async (fd, callback) => {
		fetch('/upload', {
			method: 'POST',
			body: fd
		})
			.then(res => res.text())
			.then(data => callback(data))
	},
	GetByQuery: (query, col, callback = () => { }) => {
		fetch('/request', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({
				action: 'getByQuery',
				query: query,
				collection: col,
			})
		})
			.then(res => res.json())
			.then(data => callback(data))
	},
	GetOne: (id, callback) => {
		fetch('/request', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({
				action: 'getOne',
				id: id
			})
		})
			.then(res => res.json())
			.then(data => callback(data))
		}
}