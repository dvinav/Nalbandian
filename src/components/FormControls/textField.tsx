import Icon from '@components/Icon'
import Icons from '@res/icons'
import Strings from '@res/strings'
import React from 'react'
import { InputGroup, Form, Row } from 'react-bootstrap'

export default (props: { name: string }) => {
	return (
		<Row className="g-2">
			<InputGroup>
				<InputGroup.Text>
					<Icon>{Icons[props.name]}</Icon>
				</InputGroup.Text>
				<Form.Control placeholder={Strings[props.name] as string} name={props.name} />
			</InputGroup>
		</Row>
	)
}
