let contextMenu_books

$(() => {
    $('.mdc-text-field:not(.searchBox)').each(function() { new mdc.textField.MDCTextField(this) })
    $('.mdc-button').each(function () { new mdc.ripple.MDCRipple(this) })
    $('.mdc-select').each(function () { new mdc.select.MDCSelect(this) })
    contextMenu_books = mdc.menu.MDCMenu.attachTo($('.contextMenu_books')[0])
    contextMenu_books.setFixedPosition(true)
})

