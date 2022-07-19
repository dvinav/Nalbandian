let defaultTab = 3

$(() => updateActiveTab(defaultTab))

$('.tabButton').on('click', (e) => {
    updateActiveTab($(e.target).data('tabButton'))
})

let updateActiveTab = tabNo => {
    $('.activeTabBtn').removeClass('activeTabBtn')
    $('.activeTabContainer').removeClass('activeTabContainer')
    $(`.tabButton[data-tab-button=${tabNo}]`).addClass('activeTabBtn')
    setTimeout(() => $(`.tabContainer[data-tab=${tabNo}]`).addClass('activeTabContainer'), 200);
    $('.headerCenter_bottomBorder').css({
        marginLeft: `${(5+23.333*(tabNo-1)+[0,2,4][tabNo-1]*5)}%`
    })
}

$('.tdInput_input input').on('focus', (e) => {
    $(e.target).parent().parent().addClass('tdInput_active')
})

$('.tdInput_input input').on('focusout', (e) => {
    $(e.target).parent().parent().removeClass('tdInput_active')
})

$('.mdc-text-field:not(.searchBox)').each(i => mdc.textField.MDCTextField.attachTo($('.mdc-text-field:not(.searchBox)')[i]))

$('.mdc-button').each(i => mdc.ripple.MDCRipple.attachTo($('.mdc-button')[i]))

$('.button_ripple').each(i => mdc.ripple.MDCRipple.attachTo($('.button_ripple')[i]))

$('.mdc-select').each(i => mdc.select.MDCSelect.attachTo($('.mdc-select')[i]))

const contextMenu_books = mdc.menu.MDCMenu.attachTo($('.contextMenu_books')[0])
contextMenu_books.setFixedPosition(true)

$('.mainContent').on('contextmenu', () => { return false })

$('.mainContent_books table tbody tr').on('contextmenu', e => { 
    contextMenu_books.setAbsolutePosition(e.pageX, e.pageY)
    console.log($(e.target).parent().attr('data-bInfo'))
    $('.contextMenu_books ul li:first-child .mdc-list-item__text').html($(e.target).parent().attr('data-bInfo'))
    contextMenu_books.open = contextMenu_books.open ? 0 : 1
})

$(() => {
    updateFormState('dataFormSection_books', 1)
})

let updateFormState = (dataForm, mode) => {
    let form = $('.' + dataForm).eq(0).children('form').eq(0)
    let addModeButton = $('.' + dataForm).eq(0).children('.dataFormSection_buttonContainer').eq(0).children('.dataFormSection_buttonContainer_addMode').eq(0)
    switch (mode) {
        case 0:
            form.attr('data-mode', 'disabled')
            form.children('.mdc-text-field').addClass('mdc-text-field--disabled')
            updateTextFields(form)
            form.children('.mdc-select').addClass('mdc-select--disabled')
            form.children('button[type=submit]').attr('disabled', '')
            addModeButton.removeAttr('disabled')
            break
        case 1:
            form.attr('data-mode', 'add')
            form.children('.mdc-text-field--disabled').removeClass('mdc-text-field--disabled')
            updateTextFields(form)
            form.children('.mdc-select--disabled').removeClass('mdc-select--disabled')
            form.children('button[type=submit]').removeAttr('disabled')
            addModeButton.attr('disabled', '')
            break
        case 2:
            form.attr('data-mode', 'edit')
            form.children('.mdc-text-field--disabled').removeClass('mdc-text-field--disabled')
            updateTextFields(form)
            form.children('.mdc-select--disabled').removeClass('mdc-select--disabled')
            form.children('button[type=submit]').removeAttr('disabled')
            addModeButton.attr('disabled', '')
            break
    }
}

let updateTextFields = form => {
    $(form).children('.mdc-text-field').each(i => {
        $(form).children('.mdc-text-field').hasClass('mdc-text-field--disabled') ? $(form).children('.mdc-text-field').eq(i).children('input').attr('disabled', '') : $(form).children('.mdc-text-field').eq(i).children('input').removeAttr('disabled')
    })
}

let clearForm = form => {
    $('.' + form).children('.mdc-text-field').each(i => {
        $('.' + form).eq(0).children('.mdc-text-field').eq(i).children('input').eq(0).val('')
        $('.' + form).eq(0).children('.mdc-text-field').eq(i).children('span.mdc-notched-outline').eq(0).children('span.mdc-notched-outline__notch').eq(0).children('span').eq(0).removeClass('mdc-floating-label--float-above')
        $('.' + form).eq(0).children('.mdc-text-field').eq(i).children('span.mdc-notched-outline').eq(0).removeClass('mdc-notched-outline--notched')
        $('.' + form).eq(0).children('.mdc-text-field').eq(i).children('span.mdc-notched-outline').eq(0).children('span.mdc-notched-outline__notch').css('width', 'auto')
    })
}