import { FormStates } from './form'
import { CollectionNames } from './general'
import { MouseEvent } from 'react'
import { Doc } from 'types/documents'

export type Props = {
	name: 'books' | 'members'
	isFormOpen: boolean
}

export type State = {
	formState: FormStates
	rows: Array<Doc>
	ctxEvent: React.MouseEvent | undefined
	showDeleteModal: boolean
	showInfoModal: boolean
	selectedDoc: Doc
	selectedId: string
	addedData: [Doc, string]
}
export interface Interface {
	showInfoModal(s: boolean): void
	showDeleteModal(s: boolean): void
	handleRowEvent(e: MouseEvent, id: string): void
}
