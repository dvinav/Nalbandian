import  $ from 'jquery'
import { UI } from './ui.js'
import { Requests } from './requests.js'
import '../sass/styles.sass'
import { Toast, Modal } from 'bootstrap'

$(UI.Init)

$(() => {
	Requests.GetMany(15, 1, 1, data => UI.Table.InsertMany(1, data))
	Requests.GetMany(15, 2, 1, data => UI.Table.InsertMany(2, data))
	Requests.GetMany(15, 3, 1, data => UI.Table.InsertMany(3, data))
})

$(document).on('submit', 'form', async e => {
	e.preventDefault()
	var data = Object.fromEntries(new FormData(e.target))
	var tab = $(e.target).parents('.tabContainer').data('tab')
	Requests.Add(data, tab, id => {
		$('#bookSuccessToast').show()
		UI.Table.Insert(tab, data, id)
		UI.Forms.Update(0)
	}, /*tab == 2 ? $(e.target).children('input[type="file"]')[0].files[0] : false*/)
})
$(() => {
	$('.tableContainer').on('scroll', e => {
		if ($(e.target).scrollTop() + $(e.target).innerHeight() >= $(e.target)[0].scrollHeight - 1) {
			var tab = parseInt($(e.target).parents('.tabContainer').attr('data-tab'))
			Requests.GetMany(10, tab, UI.Table.Index.Current[tab], data => UI.Table.InsertMany(tab, data))
		}
	})
})