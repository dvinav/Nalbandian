import Icon from '@components/Icon'
import Icons from '@res/icons'
import React from 'react'
import { Form, InputGroup, Row } from 'react-bootstrap'

type Props = {
	defaultValue: string
	children: React.ReactNode
	name: string
}

export default (props: Props) => {
	return (
		<Row className="g-2">
			<InputGroup>
				<InputGroup.Text>
					<Icon>{Icons[props.name]}</Icon>
				</InputGroup.Text>
				<Form.Select name={props.name} defaultValue={props.defaultValue}>
					{props.children}
				</Form.Select>
			</InputGroup>
		</Row>
	)
}
