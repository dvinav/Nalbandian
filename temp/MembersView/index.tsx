import * as React from 'react'
import ViewLayout from '@layouts/ViewLayout'
import { GetOne } from '@utils/api'
import { FormInputs, Info, TableHead } from './components'
import Strings from '@res/strings'
import { Doc, Member, Position, ViewComponents, ViewStates } from '@utils/types'
import { View } from '@utils/interfaces'
import { memberInfoModal as IMClass } from '@styles/modules/modals.module.sass'
import { DeleteModal, InfoModal } from '@components/Modals'
import ContextMenu from '@components/ContextMenu'

class MembersView extends React.Component<{}, ViewStates> implements View {
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

	show(element: ViewComponents, show: boolean, data?: string | Position): void {
		switch (element) {
			case 'deleteModal':
				this.setState({ deleteModal: { show: show } })
				break
			case 'infoModal':
				if (show && typeof data === 'string')
					GetOne(data, 2).then((res) => {
						this.setState({ infoModal: { data: res[0], show: true }, selectedID: res[0]._id })
					})
				else this.setState({ infoModal: { show: false, data: this.emptyInfoData } })
				break
			case 'contextMenu':
				this.setState({ deleteModal: { show: show } })
				break
		}
	}

	emptyInfoData = {
		address: '-',
		name: '-',
		surname: '-',
		birthdate: '-',
		phone: '-',
		home: '-',
		memberCode: '-',
		picture: '',
	}

	render() {
		return (
			<ViewLayout name="members" formInputs={FormInputs} tableHead={TableHead} onRowClick={(id: string) => this.openInfoModal(id)}>
				<InfoModal
					title={Strings.memberInfo}
					show={this.state.infoModal.show}
					onDelete={() => this.showDeleteModal(true)}
					onClose={() => this.resetInfoModal()}
					onEdit={() => {}}
					className={IMClass}
				>
					<Info doc={this.state.infoModal.data as Member} />
				</InfoModal>
				<ContextMenu
					show={this.state.contextMenu.show}
					pos={this.state.contextMenu.pos != null ? this.state.contextMenu.pos : [-1, -1]}
					ref={this.contextMenuRef}
					onDeleteClick={() => this.showDeleteModal(true)}
					onEditClick={() => this.showDeleteModal(false)}
				/>
				<DeleteModal show={this.state.deleteModal.show} col={3} id={this.state.selectedID} close={() => {}} />
			</ViewLayout>
		)
	}
}

export default MembersView
