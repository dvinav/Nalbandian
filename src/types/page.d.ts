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
	ctxData:
		| {
				pos: Position
				target: Node
		  }
		| undefined
}

export type Layouts = {
	deleteModal: boolean
	infoModal: boolean
}

export type Vars = {
	show: Layouts
	selectedDoc: string
	addedData: [Doc, string]
}

export interface Interface {
	vars: Vars

	toggle(el: keyof Layouts): void
	show(el: keyof Layouts): void
	hide(el: keyof Layouts): void
	select(id: string): void
	handleRowEvent(e: MouseEvent, id: string): void
}
