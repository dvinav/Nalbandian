const defaultTab = 2

const Helper = n => {
	let to
	switch (n) {
	case 1:
		to = MDCElements.tab_1
		break
	case 2:
		to = MDCElements.tab_2
		break
	case 3:
		to = MDCElements.tab_3
		break
	}
	return {
		q: query => { return $(`.tabContainer[data-tab=${n}] ${query}`) },
		o: to,
		f: query => { return $(`.tabContainer[data-tab=${n}] form ${query}`) }
	}
	
}

const forms = {
	update: (tab, mode) => {
		switch (mode) {
			case 0:
				Helper(tab).o.textFields.forEach((e) => e.disabled = 1)
				if (tab == 3) Helper(tab).o.select.disabled = 1
				Helper(tab).q('form').attr('data-mode', 'disabled')
				Helper(tab).f('input').attr('disabled', '')
				Helper(tab).f('.mdc-text-field').addClass('mdc-text-field--disabled')
				Helper(tab).q(':submit').attr('disabled', true)
				Helper(tab).q('.dataFormSection_buttonContainer_addButton').removeAttr('disabled')
				forms.clear()
				break
			case 1:
				Helper(tab).o.textFields.forEach((e) => e.disabled = 0)
				if (tab == 3) Helper(tab).o.select.disabled = 0
				Helper(tab).q('form').attr('data-mode', 'add')
				Helper(tab).f('input').removeAttr('disabled')
				$(`.tabContainer[data-tab=${tab}] form .mdc-text-field--disabled`).removeClass('mdc-text-field--disabled')
				Helper(tab).q(':submit').attr('disabled', true)
				Helper(tab).q('.dataFormSection_buttonContainer_addButton').attr('disabled', true)
				break
			case 2:
				Helper(tab).o.textFields.forEach((e) => e.disabled = 0)
				if (tab == 3) Helper(tab).o.select.disabled = 0
				Helper(tab).q('form').attr('data-mode', 'edit')
				Helper(tab).f('input').removeAttr('disabled')
				$(`.tabContainer[data-tab=${tab}] form .mdc-text-field--disabled`).removeClass('mdc-text-field--disabled')
				Helper(tab).q(':submit').removeAttr('disabled')
				Helper(tab).q('.dataFormSection_buttonContainer_addButton').attr('disabled', true)
				break
		}
	},
	clear: () => {
		$('input').val('')
		$('.mdc-text-field .mdc-floating-label--float-above').removeClass('mdc-floating-label--float-above')
		$('.mdc-text-field .mdc-notched-outline__notch').css('width', 'auto')
		$('.mdc-text-field .mdc-notched-outline--notched').removeClass('mdc-notched-outline--notched')
	},
	updateSubmitBtn: form => {
		
		Helper(form).f('[required]').each(function() {
			if($(this).val() == '') {
				console.log('asdasdasd   ' + form)
				Helper(form).f('[type=submit]').prop('disabled', 'true')
				return false
			} else {
				Helper(form).f('[type=submit]').removeAttr('disabled')
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

let showContextMenu = (n, i, x, y) => {
	Helper(n).o.contextMenu.setAbsolutePosition(x, y)
	Helper(n).q('contextMenu .mdc-list-item__text').html(i)
	Helper(n).o.contextMenu.open = Helper(n).o.contextMenu.open ? 0 : 1
}

const initialize = () => {
    updateActiveTab(defaultTab)
	forms.update(2, 0)
	forms.update(3, 0)

    $('.tabButton').on('click', (e) => {
        updateActiveTab($(e.target).data('tabButton'))
    })

    $('.mainContent').on('contextmenu', () => { return false })

    $('.tabContainer tbody tr').on('contextmenu', e => {
		let bInfo = $(e.target).parent().attr('data-bInfo')
		switch (parseInt($(e.target).parents('.tabContainer').attr('data-tab'))) {
			case 1:
				showContextMenu(1, bInfo, e.pageX, e.pageY)
				break
			case 2:
				showContextMenu(2, bInfo, e.pageX, e.pageY)
				break
			case 3:
				showContextMenu(3, bInfo, e.pageX, e.pageY)
				break
		}
        
    })

	$('.dataFormSection_buttonContainer_addButton').on('click', e => {
		forms.update(parseInt($(e.target).parents('.tabContainer').attr('data-tab')), 1)
	})

	$('.dataFormSection_buttonContainer_clearButton').on('click', e => {
		forms.clear()
	})

	Helper(3).f('input').on('input', () => {
		forms.updateSubmitBtn(3)
	})

	Helper(2).f('input').on('input', () => {
		forms.updateSubmitBtn(2)
	})
}

$(() => initialize())