const removeQuotes = (s: string) => {
	return s.replace(/['"]+/g, '')
}

export default removeQuotes
