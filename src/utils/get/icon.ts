import Icons from 'res/icons'

function getIcon(s: string): string {
	return Icons[s as keyof typeof Icons]
}

export default getIcon
