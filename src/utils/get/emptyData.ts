import { Doc } from 'types/documents'
import * as ED from 'res/emptyData'

function getEmptyData(s: string) {
	return ED[s as keyof typeof ED] as Doc
}

export default getEmptyData
