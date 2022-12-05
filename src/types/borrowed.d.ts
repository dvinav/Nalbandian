import { Doc } from './documents.d'
import { FormStates } from './form'
import { MouseEvent } from 'react'

export type Props = {
	isFormOpen: boolean
}

export type State = {
	formState: FormStates
	rows: Array<Doc>
	ctxEvent: React.MouseEvent | undefined
	showDeleteModal: boolean
	showSelectorModal: boolean
	modal: 2 | 3
	selectedId: string
	addedData: [Doc, string]
	selectedBook: string
	selectedMember: string
	hasScrolledDown: boolean
}
export interface Interface {
	showDeleteModal(s: boolean): void
	handleRowEvent(e: MouseEvent, id: string): void
}
