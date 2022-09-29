export const DeleteDoc = (col: number, id: String, callback: Function) => {
	fetch('/delete', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			collection: col,
			id: id,
		}),
	}).then(() => callback(id))
}

export const GetMany = async (count: number, col: number, skip: number): Promise<any[]> => {
	const res = await fetch('/getMany', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			count: count,
			collection: col,
			skip: skip,
		}),
	})
	const data = res.json()
	return data
}

export const AddDoc = async (fd: FormData, callback: Function) => {
	fetch('/upload', {
		method: 'POST',
		body: fd,
	})
		.then((res) => res.text())
		.then((data) => callback(data))
}

export const GetByQuery = (query: String, col: number, callback: Function) => {
	fetch('/getByQuery', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			query: query,
			collection: col,
		}),
	})
		.then((res) => res.json())
		.then((data) => callback(data))
}

export const GetOne = async (id: string, col: number) => {
	const res = await fetch('/getOne', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			id: id,
			collection: col,
		}),
	})
	const data = await res.json()
	return data
}
