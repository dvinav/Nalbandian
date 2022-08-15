export const Requests = {
	GetMany: (count, col, skip, callback = () => {}) => {
		fetch('/get', {
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
		fetch('/get', {
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

}