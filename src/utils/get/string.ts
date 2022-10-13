import Strings from 'res/strings'

function getString(s: string): string {
	return Strings[s as keyof typeof Strings]
}

export default getString
