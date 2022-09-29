const unquote = (s: string) => {
	return s.replace(/['"]+/g, '')
}

export default unquote
