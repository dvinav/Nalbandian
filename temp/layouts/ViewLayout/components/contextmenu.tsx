import React from 'react'
import ContextMenu from '@components/ContextMenu'

type Props = {
	id: string
}

const contextMenu = (p: Props) => (
	<ContextMenu
		show={this.state.contextMenu.show}
		pos={this.state.contextMenu.pos != null ? this.state.contextMenu.pos : [-1, -1]}
		ref={this.contextMenuRef}
		onDeleteClick={() => this.show('deleteModal', true)}
		onEditClick={() => this.show('infoModal', false)}
	/>
)
