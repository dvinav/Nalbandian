const SendRequest = async (data, callback) => {
	await $.ajax({
		type: 'POST',
		url: '/request',
		processData: false,
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(data),
		success: function (res) {
			callback(res) 
		}
	}).fail(err => console.log('Error'))
}

const Upload = async (data, callback) => {
	await $.ajax({
		type: 'POST',
		url: '/upload',
		processData: false,
		contentType: 'multipart/form-data',
		data: data,
		success: function (res) {
			callback(res) 
		}
	}).fail(err => console.log('Error'))
}

export const Requests = {
	GetMany: (count, col, skip, callback = () => {}) => {
		SendRequest({
			action: 'getMany',
			count: count,
			collection: col,
			skip: skip
		}, data => callback(data))
	},
	Add: (data, col, callback, file = false) => {
		console.log(data)
		SendRequest({
			action: 'add',
			collection: col,
			data: data
		}, data => { 
			if (file) {
				var formData = new FormData()
				formData.append(file)
				Upload(formData)
			}
			callback(data)
		})
		
	}
}