import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { getCol, getIcon, getString } from 'utils/get'
import Icon from 'components/Icon'
import { DeleteDoc } from 'utils/api'
import { deleteModal as className } from 'styles/modals.module.sass'
import { CollectionNames, CollectionNumbers } from 'types/general'

type Props = {
	show: boolean
	id: string
	name: CollectionNames
	close: Function
	result: Function
}

export default (p: Props) => {
	return (
		<Modal size="sm" aria-labelledby="contained-modal-title-vcenter" centered show={p.show} dialogClassName={className}>
			<Modal.Header closeButton onClick={() => p.close()} />
			<Modal.Body>{getString('deleteConfirmation')}</Modal.Body>
			<Modal.Footer>
				<Button onClick={() => p.close()}>
					<Icon>{getIcon('cancel')}</Icon>
					{getString('cancel')}
				</Button>
				<Button
					variant="danger"
					onClick={() =>
						DeleteDoc(getCol(p.name), p.id, () => {
							p.close()
							p.result()
						})
					}
				>
					<Icon>{getIcon('delete')}</Icon>
					{getString('delete')}
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
