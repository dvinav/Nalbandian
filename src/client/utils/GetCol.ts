const TN = (n: number): string => {
	switch (n) {
		case 1:
			return 'borrowed'
			break
		case 2:
			return 'members'
			break
		case 3:
			return 'books'
			break
		default:
			return ''
			break
	}
}

const TS = (s: string): number => {
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

const GetCol = (p: string | number) => {
	return typeof p == 'string' ? TS(p) : TN(p)
}

export default GetCol
