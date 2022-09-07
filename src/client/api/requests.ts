export const Delete = (col: number, id: String, callback: Function) => {
	fetch('/request', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			action: 'delete',
			collection: col,
			id: id,
		}),
	}).then(() => callback(id))
}

export const GetMany = async (count: number, col: number, skip: number): Promise<any[]> => {
	const res = await fetch('/request', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			action: 'getMany',
			count: count,
			collection: col,
			skip: skip,
		}),
	})
	const data = res.json()
	return data
}

export const Add = async (fd: FormData, callback: Function) => {
	fetch('/upload', {
		method: 'POST',
		body: fd,
	})
		.then((res) => res.text())
		.then((data) => callback(data))
}

export const GetByQuery = (query: String, col: number, callback: Function) => {
	fetch('/request', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			action: 'getByQuery',
			query: query,
			collection: col,
		}),
	})
		.then((res) => res.json())
		.then((data) => callback(data))
}

export const GetOne = (id: String, callback: Function) => {
	fetch('/request', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			action: 'getOne',
			id: id,
		}),
	})
		.then((res) => res.json())
		.then((data) => callback(data))
}
