import Icon from '@components/Icon'
import Icons from '@res/icons'
import Strings from '@res/strings'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { DeleteDoc } from '@utils/api'
import './index.css'

type Props = {
	onDelete: Function
	onCancel: React.MouseEventHandler
	show: boolean
	col: number
	id: string
}

export default (props: Props) => {
	return (
		<Modal size="sm" aria-labelledby="contained-modal-title-vcenter" centered show={props.show}>
			<Modal.Header closeButton onClick={props.onCancel} />
			<Modal.Body>{Strings.deleteConfirmation}</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onCancel}>
					<Icon>{Icons.cancel}</Icon>
					{Strings.cancel}
				</Button>
				<Button variant="danger" onClick={() => DeleteDoc(props.col, props.id, props.onDelete)}>
					<Icon>{Icons.delete}</Icon>
					{Strings.delete}
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
