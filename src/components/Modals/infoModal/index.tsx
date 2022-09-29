import Icon from '@components/Icon'
import Icons from '@res/icons'
import Strings from '@res/strings'
import React from 'react'
import { Button, Container, Modal } from 'react-bootstrap'
// import './InfoModal.css'

type Props = {
	onClose: React.MouseEventHandler
	onDelete: React.MouseEventHandler
	onEdit: React.MouseEventHandler
	show: boolean
	title: string
	tableContent: JSX.Element
}

export default (props: Props) => (
	<Modal centered show={props.show} dialogClassName="BIM">
		<Modal.Header closeButton onClick={props.onClose}>
			<Modal.Title>{props.title}</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<Container>{props.tableContent}</Container>
		</Modal.Body>
		<Modal.Footer>
			<Button variant="danger" onClick={props.onDelete}>
				<Icon>{Icons.delete}</Icon>
				{Strings.delete}
			</Button>
			<Button onClick={props.onEdit}>
				<Icon>{Icons.edit}</Icon>
				{Strings.edit}
			</Button>
			<Button onClick={props.onClose}>
				<Icon>{Icons.close}</Icon>
				{Strings.close}
			</Button>
		</Modal.Footer>
	</Modal>
)
