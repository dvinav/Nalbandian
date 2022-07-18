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

$('.mdc-text-field').each(i => mdc.textField.MDCTextField.attachTo($('.mdc-text-field')[i]))

$('.mdc-button').each(i => mdc.ripple.MDCRipple.attachTo($('.mdc-button')[i]))

$('.mdc-select').each(i => mdc.select.MDCSelect.attachTo($('.mdc-select')[i]))

