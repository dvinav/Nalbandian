var MDCElements = {
	tab_2: {
		textFields: new Array(),
		contextMenu: null
	},
	tab_3: {
		textFields: new Array(),
		select: null,
		contextMenu: null
	},

}

$(() => {
	$('.tabContainer[data-tab=2] > .dataFormSection > form .mdc-text-field:not(.searchBox)').each(function(i) { MDCElements.tab_2.textFields[i] = new mdc.textField.MDCTextField(this) })
	$('.tabContainer[data-tab=3] > .dataFormSection > form .mdc-text-field:not(.searchBox)').each(function(i) { MDCElements.tab_3.textFields[i] = new mdc.textField.MDCTextField(this) })
    $('.mdc-button').each(function() { mdc.ripple.MDCRipple.attachTo(this) })
	MDCElements.tab_3.select = mdc.select.MDCSelect.attachTo($('.tabContainer[data-tab=3] form .mdc-select')[0])
    MDCElements.tab_3.contextMenu = new mdc.menu.MDCMenu($('.tabContainer[data-tab=3] .contextMenu')[0])
    MDCElements.tab_3.contextMenu.setFixedPosition(true)
    MDCElements.tab_2.contextMenu = new mdc.menu.MDCMenu($('.tabContainer[data-tab=2] .contextMenu')[0])
    MDCElements.tab_2.contextMenu.setFixedPosition(true)
})

