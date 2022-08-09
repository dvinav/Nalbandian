
$(document).on('submit', 'form', async e => {
	e.preventDefault()
	var data = Object.fromEntries((new FormData(e.target)).entries())
	var tab = $(e.target).parents('.tabContainer').attr('data-tab')
	SendRequest({
		action: $(e.target).attr('data-mode'),
		collection: tab,
		formData: data
	}, res => {
		Table.Insert(tab, data, res.insertedId)
		Forms.Update(tab, 0)
	})
})

$(() => {


	$('.mainContent .tableContainer').on('scroll', e => {
		// if ($(e.target)[0].scrollHeight - $(e.target).scrollTop() > ($(e.target).height()))
		// 	console.log('true')
		if ($(e.target).scrollTop() + $(e.target).innerHeight() >= $(e.target)[0].scrollHeight - 1) {
			var tab = parseInt($(e.target).parents('.tabContainer').attr('data-tab'))
			SendRequest({
				action: 'getMany',
				count: 10,
				collection: tab
			}, data => {
				Table.InsertMany(tab, data)
			})
		}
	})
})

const Requests = {
	Send: async (data, callback) => {
		await $.ajax({
			type: 'POST',
			url: '/request',
			processData: false,
			contentType: false,
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(data),
			success: function (res) {
				callback(res)
			}
		}).fail(err => console.log('Error'))
	}
}

export const Data = {
	GetMany: (count, col, callback) => {
		Requests.Send({
			action: 'getMany',
			count: count,
			collection: col
		}, data => {
			callback(data)
		})
	}
}