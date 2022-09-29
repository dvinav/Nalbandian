import { Doc } from './types'

export interface View {
	fetchInfoData(id?: string): Doc
	openInfoModal(id: string): void
	resetInfoModal(): void
}
