import * as React from 'react'
import ViewLayout from '@layouts/ViewLayout'
import Strings from '@res/strings'
import { Book, Position, ViewComponents, ViewStates } from '@utils/types'
import { View } from '@utils/interfaces'
import { FormInputs, TableHead } from './components'
import { GetOne } from '@utils/api'
import styles from '@styles/modules/modals.module.sass'
import { DeleteModal, InfoModal } from '@components/Modals'
import { Info } from './components'
import ContextMenu from '@components/ContextMenu'

class BooksView extends React.Component<{}, ViewStates> implements View {
	contextMenuRef: React.RefObject<HTMLDivElement>

	constructor(props: {}) {
		super(props)
		this.state = {
			infoModal: {
				show: false,
				data: this.emptyInfoData,
			},
			deleteModal: {
				show: false,
			},
			contextMenu: {
				show: false,
			},
		}

		this.contextMenuRef = React.createRef()
	}

	/* show(element: ViewComponents, show: boolean, data?: string | Position): void {
		switch (element) {
			case 'deleteModal':
				this.setState({ deleteModal: { show: show } })
				break
			case 'infoModal':
				if (show && typeof data === 'string')
					GetOne(data, 3).then((res) => {
						this.setState({ infoModal: { data: res[0], show: true }, selectedID: res[0]._id })
					})
				else this.setState({ infoModal: { show: false, data: this.emptyInfoData } })
				break
			case 'contextMenu':
				if (show) this.setState({ contextMenu: { pos: data as Position, show: true } })
				else this.setState({ contextMenu: { show: false } })
				break
		}
	} */

	emptyInfoData = {
		title: '-',
		author: '-',
		subtitle: '-',
		bookCode: '-',
		language: '-',
		publishDate: '-',
		ISBN: '-',
		ebook: '-',
		translator: '-',
		publishLocation: '-',
		publishing: '-',
	}

	selectedID(id?: string): string | void {
		if (id) this.setState({ selectedID: id })
		else return this.state.selectedID
	}

	contextMenuHandle(e: React.MouseEvent, id?: string): void {
		e.preventDefault()
		if (!this.contextMenuRef.current?.contains(e.target as Node) && this.state.contextMenu.show) this.show('contextMenu', false)
		else if (id) {
			this.selectedID(id)
			this.show('contextMenu', true, [e.clientX, e.clientY])
		}
	}

	render() {
		return <ViewLayout name="books" formInputs={FormInputs} tableHead={TableHead}></ViewLayout>
	}
}

export default BooksView
