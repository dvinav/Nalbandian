import React from 'react'
import { InputGroup, Form, Row } from 'react-bootstrap'
import Icon from 'components/Icon'
import { getIcon, getString } from 'utils/get'
import styles from 'styles/form.module.sass'

export default (p: { name: string }) => {
	return (
		<Row className={'g-2 ' + styles.rowClass}>
			<InputGroup>
				<InputGroup.Text>
					<Icon>{getIcon(p.name)}</Icon>
				</InputGroup.Text>
				<Form.Control placeholder={getString(p.name)} name={p.name} />
			</InputGroup>
		</Row>
	)
}
