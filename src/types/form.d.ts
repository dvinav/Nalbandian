import { CollectionNames } from 'types/general'
import { Doc } from './documents'

export type FormStates = 0 | 1 | 2 // 0 = disabled, 1 = add mode, 2 = edit mode

export type Props = {
	name: CollectionNames
	show: boolean
	state: FormStates
	setState: (s: FormStates) => void
	result: (fd: Doc, id: string) => void
}

export type States = {
	formState: FormStates
}
