import Icon from 'components/Icon'
import { getIcon } from 'utils/get'
import React from 'react'
import { Form, InputGroup, Row } from 'react-bootstrap'
import styles from 'styles/form.module.sass'

type Props = {
	name: string
}

export default (props: Props) => {
	return (
		<Row className={'g-2 ' + styles.rowClass}>
			<InputGroup>
				<InputGroup.Text>
					<Icon>{getIcon(props.name)}</Icon>
				</InputGroup.Text>
				<Form.Control type="file" name="picture" />
			</InputGroup>
		</Row>
	)
}
