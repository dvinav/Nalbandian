import Icon from 'components/Icon'
import { getString, getIcon, getCol, getEmptyData } from 'utils/get'
import React from 'react'
import { Button, Container, Modal } from 'react-bootstrap'
import styles from 'styles/modals.module.sass'
import Layout from './layouts'
import { CollectionNames } from 'types/general'
import { Doc } from 'types/documents'

type Props = {
	doc: Doc
	name: CollectionNames
	show: boolean
	close(): void
	delete(): void
	edit(): void
}

export default (p: Props) => {
	return (
		<Modal centered show={p.show} dialogClassName={styles[(p.name + 'Info') as keyof typeof styles]}>
			<Modal.Header closeButton onClick={p.close}>
				<Modal.Title>{getString(p.name + 'info')}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container>
					<Layout name={p.name} doc={p.doc} />
				</Container>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="danger" onClick={p.delete}>
					<Icon>{getIcon('delete')}</Icon>
					{getString('delete')}
				</Button>
				<Button onClick={p.edit}>
					<Icon>{getIcon('edit')}</Icon>
					{getString('edit')}
				</Button>
				<Button onClick={p.close}>
					<Icon>{getIcon('close')}</Icon>
					{getString('close')}
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
