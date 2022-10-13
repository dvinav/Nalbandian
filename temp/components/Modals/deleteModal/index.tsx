import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Icon from '@components/Icon'
import Icons from '@res/icons'
import Strings from '@res/strings'
import { DeleteDoc } from '@utils/api'
import { deleteModal as className } from '@styles/modules/modals.module.sass'
import { CollectionNumbers } from '@utils/types'

type Props = {
	col: CollectionNumbers
	id: string
}

export default (p: Props) => {
	const [isOpen, show] = useState(false)

	const closeModal = () => show(false)

	if (p.id != '') show(true)
	else show(false)

	return (
		<Modal size="sm" aria-labelledby="contained-modal-title-vcenter" centered show={isOpen} dialogClassName={className}>
			<Modal.Header closeButton onClick={closeModal} />
			<Modal.Body>{Strings.deleteConfirmation}</Modal.Body>
			<Modal.Footer>
				<Button onClick={closeModal}>
					<Icon>{Icons.cancel}</Icon>
					{Strings.cancel}
				</Button>
				<Button variant="danger" onClick={() => DeleteDoc(p.col, p.id, closeModal)}>
					<Icon>{Icons.delete}</Icon>
					{Strings.delete}
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
