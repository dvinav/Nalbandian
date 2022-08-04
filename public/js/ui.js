const defaultTab = 1

const TS = (tab, query) => {
	return $(`.tabContainer[data-tab=${tab}] .dataFormSection ${query}`)
}

const forms = {
	update: (tab, mode) => {
		switch (mode) {
			case 0:
				TS(tab, `form`).attr('data-mode', 'disabled')
				TS(tab, `form input`).attr('disabled', '')
				TS(tab, `form select`).attr('disabled', '')
				TS(tab, `.formFooter button`).attr('disabled', true)
				TS(tab, `.dataFormSection_buttonContainer_addButton`).removeAttr('disabled')
				forms.clear(tab)
				break
			case 1:
				TS(tab, `form`).attr('data-mode', 'add')
				TS(tab, `form input`).removeAttr('disabled')
				TS(tab, `form select`).removeAttr('disabled')
				TS(tab, `.formFooter button[type=submit]`).attr('disabled', true)
				TS(tab, `.formFooter button[type=button]`).removeAttr('disabled')
				TS(tab, `.dataFormSection_buttonContainer_addButton`).attr('disabled', '')
				break
			case 2:
				TS(tab, `form`).attr('data-mode', 'edit')
				TS(tab, `form input`).removeAttr('disabled')
				TS(tab, `form select`).removeAttr('disabled')
				TS(tab, `.formFooter button[type=submit]`).attr('disabled', true)
				TS(tab, `.formFooter button[type=button]`).removeAttr('disabled')
				TS(tab, `.dataFormSection_buttonContainer_addButton`).attr('disabled', '')
				break
		}
	},
	clear: tab => {
		TS(tab, `form input`).val('')
	},
	updateSubmitBtn: form => {
		TS(form, 'form [required]').each(function() {
			if($(this).val() == '') {
				TS(form, 'form [type=submit]').prop('disabled', 'true')
				return false
			} else {
				TS(form, 'form [type=submit]').removeAttr('disabled')
			}
		})
	}
}

let updateActiveTab = tabNo => {
    $('.activeTabBtn').removeClass('activeTabBtn')
    $('.activeTabContainer').removeClass('activeTabContainer')
    $(`.tabButton[data-tab-button=${tabNo}]`).addClass('activeTabBtn')
    setTimeout(() => $(`.tabContainer[data-tab=${tabNo}]`).addClass('activeTabContainer'), 200);
    $('.headerCenter_bottomBorder').css({
        marginLeft: `${(5+23.333*(tabNo-1)+[0,2,4][tabNo-1]*5)}%`
    })
}

const initialize = () => {
    updateActiveTab(defaultTab)
	forms.update(1, 0)
	forms.update(2, 0)
	forms.update(3, 0)

    $('.tabButton').on('click', (e) => {
        updateActiveTab($(e.target).data('tabButton'))
    })

    $('.mainContent').on('contextmenu', () => { return false })

	$('.dataFormSection_buttonContainer_addButton').on('click', e => {
		forms.update(parseInt($(e.target).parents('.tabContainer').attr('data-tab')), 1)
	})

	$('.dataFormSection_buttonContainer_clearButton').on('click', e => {
		forms.clear($(e.target).parents('.tabContainer').attr('data-tab'))
	})

	$('.dataFormSection .formFooter [type=button]').on('click', e => {
		forms.update($(e.target).parents('.tabContainer').attr('data-tab'), 0)
		forms.clear($(e.target).parents('.tabContainer').attr('data-tab'))
	})

	$('.dataFormSection input').on('input', e => {
		
		forms.updateSubmitBtn($(e.target).parents('.tabContainer').attr('data-tab'))
	})
}


$(() => initialize())