import { Doc } from 'types/documents'
import { CollectionNames } from 'types/general'
import { MouseEvent } from 'react'

export type Props = {
	name: CollectionNames
	event: (e: MouseEvent, id: string) => void
	expand: boolean
	data: Array<Doc>
	setData: (data: Array<Doc>) => void
}

export type States = {
	hasScrolledDown: boolean
}
