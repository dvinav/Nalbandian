const SendRequest = async data => {
	await $.ajax({
		type: 'POST',
		url: '/request',
		processData: false,
		contentType: false,
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(data)
	}).fail(err => alert(err))
}

$(document).on('submit', '.dataFormSection > form', async e => {
	e.preventDefault()
	var tab = $(e.target).parents('.tabContainer').attr('data-tab')
	SendRequest({
		action: $(e.target).attr('data-mode'),
		collection: tab,
		formData: Object.fromEntries((new FormData(e.target)).entries())
	}).then(() => {
		forms.update(tab, 0)
	})
})