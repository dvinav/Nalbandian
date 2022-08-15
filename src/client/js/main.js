import  $ from 'jquery'
import { UI } from './ui.js'
import { Requests } from './requests.js'
import '../sass/styles.sass'
import { Toast, Modal } from 'bootstrap'

let isSearching = false
$(UI.Init)

$(() => {
	Requests.GetMany(15, 1, 1, data => UI.Table.InsertMany(1, data))
	Requests.GetMany(15, 2, 1, data => UI.Table.InsertMany(2, data))
	Requests.GetMany(15, 3, 1, data => UI.Table.InsertMany(3, data))
})

$(document).on('submit', 'form', async e => {
	e.preventDefault()
	var fd = new FormData(e.target)
	fd.append('collection', $('.activeTabContainer').data('tab'))
	Requests.Add(fd, id => {
		$('#bookSuccessToast').show()
		UI.Table.Insert($(e.target).parents('.tabContainer').data('tab'), Object.fromEntries(fd), id)
		UI.Forms.Update(0)
	},)
})

$(() => {

	$('.tableContainer').on('scroll', e => {
		if ($(e.target).scrollTop() + $(e.target).innerHeight() >= $(e.target)[0].scrollHeight - 1 && !isSearching) {
			var tab = parseInt($(e.target).parents('.tabContainer').attr('data-tab'))
			Requests.GetMany(10, tab, UI.Table.Index.Current[tab], data => UI.Table.InsertMany(tab, data))
		}
	})

	$('.searchBox input').on('input', e => {
		UI.Table.Clear()
		if ($('.activeTabContainer .searchBox input').val()) {
			isSearching = true
			Requests.GetByQuery($(e.target).val(), $('.activeTabContainer').data('tab'), data => {
				UI.Table.InsertMany($('.activeTabContainer').data('tab'), data)
			})
		} else {
			isSearching = false
			Requests.GetMany(15, $('.activeTabContainer').data('tab'), 1, data => UI.Table.InsertMany($('.activeTabContainer').data('tab'), data))
		}
		UI.Table.Index.Update($('.activeTabContainer').data('tab'))
	})
})