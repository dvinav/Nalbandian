const TN = (s: String) => {
	switch (s) {
		case 'borrowed':
			return 1
			break
		case 'members':
			return 2
			break
		case 'books':
			return 3
			break
		default:
			return 0
			break
	}
}

export default TN
