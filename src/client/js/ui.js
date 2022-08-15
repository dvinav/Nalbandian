import { Toast, Modal } from 'bootstrap'
const defaultTab = 3
const toastOptions = {
	animation: true,
	autohide: true,
	delay: 2000
}

const Forms = {
	Init: () => {
		$(`form`).attr('data-mode', 'disabled')
		$(`.formContainer`).find('input, select, .btn-success, .btn-danger').attr('disabled', true)
		$(`.addBtn`).removeAttr('disabled')
	},
	Update: mode => {
		switch (mode) {
			case 0:
				$(`.activeTabContainer form`).data('mode', 'disabled')
				$(`.activeTabContainer .formContainer`).find('input, select, .btn-success, .btn-danger').attr('disabled', true)
				$(`.activeTabContainer .addBtn`).removeAttr('disabled')
				Forms.Clear()
				break
			case 1:
				$(`.activeTabContainer form`).data('mode', 'add')
				$(`.activeTabContainer .formContainer`).find('input, select, .btn-danger').removeAttr('disabled')
				$(`.activeTabContainer .formContainer`).find('.addBtn, .btn-sucess').attr('disabled', true)
				break
			case 2:
				$(`.activeTabContainer form`).data('mode', 'edit')
				$(`.activeTabContainer .formContainer`).find('input, select, .btn-danger').removeAttr('disabled')
				$(`.activeTabContainer .formContainer`).find('.addBtn, .btn-sucess').attr('disabled', true)
				break
		}
	},
	Clear: () => $(`.activeTabContainer form input`).val(''),
	UpdateSubmitBtn: () => {
		$(`.activeTabContainer form [required]`).each(function() {
			if ($(this).val() == '') {
				$(`.activeTabContainer form [type=submit]`).attr('disabled', true)
				return false
			}
			else  {
				$(`.activeTabContainer form [type=submit]`).removeAttr('disabled')
			}
		})
	}
}

const Tab = {
	Active: $('.activeTabContainer').data('tab'),
	Switch: (tab, callback = () => {}) => {
		$('.activeTabBtn').removeClass('activeTabBtn')
		$('.activeTabContainer').removeClass('activeTabContainer')
		$(`.tabButton[data-tab-button=${tab}]`).addClass('activeTabBtn')
		setTimeout(() => $(`.tabContainer[data-tab=${tab}]`).addClass('activeTabContainer', callback()), 200)
		$('.tabIndicator').css({
			marginLeft: `${(5 + 23.333 * (tab - 1) + [0, 2, 4][tab - 1] * 5)}%`
		})
	}
}

const Table = {
	Index: {
		Current: {
			1: 1,
			2: 1,
			3: 1
		},
		Update: tab => {
			Table.Index.Current[tab] = 1
			$(`.tabContainer[data-tab=${tab}] tbody tr`).each((i, e) => {
				$(e).children('td:first-child').html(Table.Index.Current[tab]++)
			})
		}
	},
	InsertMany: (tab, data) => {
		data.forEach(doc => {
			switch (tab) {
				case 1:
					$(`.tabContainer[data-tab=1] table tbody`).append(`<tr>
						<td>${Table.Index.Current[1]++}</td>
						<td>${doc.member != null ? doc.member : '-'}</td>
						<td>${doc.book != null ? doc.book : '-'}</td>
						<td>sdfsdfsdf</td>
						<td>sdfsdfdsf</td>
						<td>sdfsdfdsf</td>

					</tr>`)
					break
				case 2:
					$(`.tabContainer[data-tab=2] table tbody`).append(`<tr data-id="${doc._id}">
						<td>${Table.Index.Current[2]++}</td>
						<td>${doc.name}</td>
						<td>${doc.surname}</td>
						<td>${doc.code}</td>
					</tr>`)
					break
				case 3:
					$(`.tabContainer[data-tab=3] table tbody`).append(`<tr data-id="${doc._id}">
						<td>${Table.Index.Current[3]++}</td>
						<td>${doc.title != '' ? doc.title : '-'}</td>
						<td>${doc.subtitle != '' ? doc.subtitle : '-'}</td>
						<td>${doc.author != '' ? doc.author : '-'}</td>
						<td>${doc.translator != '' ? doc.translator : '-'}</td>
						<td>${doc.code}</td>
						<td>
							<a target="blank" ${doc.ebook != '' ? 'href="' + doc.ebook + '"' : 'class="disabled"'}>
								<span class="material-icons-round">link</span>
							</a>
						</td>
					</tr>`)
					break
			}
		})
	},
	Insert: (tab, doc, id) => {
		switch (parseInt(tab)) {
			case 1:
				$(`<tr>
					<td>${Table.Index.Current[1]++}</td>
					<td>${doc.name != null ? doc.name : '-'}</td>
					<td>${doc.book != null ? doc.book : '-'}</td>
					<td>${doc.author != null ? doc.author : '-'}</td>
					<td>${doc.translator != null ? doc.translator : '-'}</td>
					<td>${doc.code}</td>
					<td>
						<a target="blank" href="${doc.ebook != null ? doc.ebook : ''}">
							<span class="material-icons-round">link</span>
						</a>
					</td>
				</tr>`).insertBefore(`.tabContainer[data-tab=1] tbody tr:first-child`).on('ready', Table.Index.Update(1))
				break
			case 2:
				$(`<tr data-id="${id}">
						<td>${Table.Index.Current[2]++}</td>
						<td>${doc.name}</td>
						<td>${doc.surname}</td>
						<td>${doc.code}</td>
					</tr>`).insertBefore(`.tabContainer[data-tab=2] tbody tr:first-child`).on('ready', Table.Index.Update(2))
				break
			case 3:
				$(`<tr data-id="${id}">
						<td>${Table.Index.Current[3]++}</td>
						<td>${doc.title != '' ? doc.title : '-'}</td>
						<td>${doc.subtitle != '' ? doc.subtitle : '-'}</td>
						<td>${doc.author != '' ? doc.author : '-'}</td>
						<td>${doc.translator != '' ? doc.translator : '-'}</td>
						<td>${doc.code}</td>
						<td>
							<a target="blank" ${doc.ebook != '' ? 'href="' + doc.ebook + '"' : 'class="disabled"'}>
								<span class="material-icons-round">link</span>
							</a>
						</td>
					</tr>`).insertBefore(`.tabContainer[data-tab=3] tbody tr:first-child`).on('ready', Table.Index.Update(3))
				break
		}
	},
	Clear: () => $(`.activeTabContainer tbody`).empty()
}

export const UI = {
	Init: () => {
		Tab.Switch(defaultTab, Forms.Init)

		$('.tabButton').on('click', e => Tab.Switch($(e.target).data('tabButton')))

		$('.mainContent').on('contextmenu', () => { return false })

		$('.formContainer .addBtn').on('click', () => Forms.Update(1))

		$('.formContainer .clearBtn').on('click', e => Forms.Clear())

		$('.formContainer .btn-danger').on('click', e => Forms.Update(0))

		$('form').on('input', Forms.UpdateSubmitBtn)
	},
	ActiveTab: Tab.Active,
	Table: Table,
	Forms: Forms,
}