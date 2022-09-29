import Icon from '@components/Icon'
import Icons from '@res/icons'
import React from 'react'
import { Form, InputGroup, Row } from 'react-bootstrap'

type Props = {
	name: string
}

export default (props: Props) => {
	return (
		<Row className="g-2">
			<InputGroup>
				<InputGroup.Text>
					<Icon>{Icons[props.name]}</Icon>
				</InputGroup.Text>
				<Form.Control type="file" name="picture" />
			</InputGroup>
		</Row>
	)
}
