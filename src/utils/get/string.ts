import Strings from 'res/strings_hy'

function getString(s: string): string {
	return Strings[s as keyof typeof Strings]
}

export default getString
