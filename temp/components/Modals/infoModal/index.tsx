import Icon from '@components/Icon'
import Icons from '@res/icons'
import Strings from '@res/strings'
import React, { useEffect, useState } from 'react'
import { Button, Container, Modal } from 'react-bootstrap'
import styles from '@styles/modules/modals.module.sass'
import { GetOne } from '@utils/api'
import Info from '@layouts/InfoLayouts'

type Props = {
	reference: string
	id: string
	col: number
	delete: React.MouseEventHandler
	edit: React.MouseEventHandler
}

export default (p: Props) => {
	const [isOpen, show] = useState(false)

	const [data, setData] = useState()

	if (p.id != '') show(true)
	else show(false)

	useEffect(() => {
		GetOne(p.id, p.col).then((res) => setData(res))
	})

	return (
		<Modal centered show={isOpen} dialogClassName={styles[p.reference]}>
			<Modal.Header closeButton onClick={() => show(false)}>
				<Modal.Title>{Strings[p.reference]}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container>
					<Info ref={p.reference} doc={data} />
				</Container>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="danger" onClick={p.delete}>
					<Icon>{Icons.delete}</Icon>
					{Strings.delete}
				</Button>
				<Button onClick={p.edit}>
					<Icon>{Icons.edit}</Icon>
					{Strings.edit}
				</Button>
				<Button onClick={() => show(false)}>
					<Icon>{Icons.close}</Icon>
					{Strings.close}
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
