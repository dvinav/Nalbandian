const dateFormat = (e: React.KeyboardEvent) => {
	var el = e.target as HTMLInputElement
	e.preventDefault()
	if (e.key >= '0' && e.key <= '9' && el.selectionStart != null) {
		switch (el.selectionStart) {
			case 0:
				if (['0', '1', '2', '3'].includes(e.key)) el.value += e.key
				break
			case 1:
				if ((el.value[0] == '3' && e.key == '0') || el.value[0] < '3') el.value += e.key + '/'
				break
			case 3:
				if (['0', '1'].includes(e.key)) el.value += e.key
				break
			case 4:
				if ((el.value[3] == '1' && ['0', '1', '2'].includes(e.key)) || el.value[3] == '0') el.value += e.key + '/'
				break
			case 6:
				if (['1', '2'].includes(e.key)) el.value += e.key
				break
			case 7:
				if ((el.value[6] == '1' && e.key == '9') || (el.value[6] == '2' && e.key == '0')) el.value += e.key
				break
			default:
				if (el.selectionStart < 10) el.value += e.key
		}
	} else if (e.key == 'Backspace') el.value = el.value.replace(/[0-9][\s|/]*?$/, '')
}

export default dateFormat
