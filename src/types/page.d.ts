import { Position } from 'types/general'
import { FormStates } from './form'
import { CollectionNames } from './general'
import { MouseEvent } from 'react'
import { Doc } from 'types/documents'

export type Props = {
	name: CollectionNames
	isFormOpen: boolean
	/* children: React.ReactNode
	onRowClick: Function
	onOutsideClick: Function
	onRowContextMenu: Function */
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
