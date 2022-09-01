import React from 'react'
import { Form, InputGroup, Row } from 'react-bootstrap'
import Icon from '../Icon/Icon'
import Strings from '../../json/strings.json'
import Icons from '../../json/icons.json'
import PascalCase from '../../utils/PascalCase'

type Props = {
	defaultValue: string
	children: React.ReactNode
	name: string
}

const Select = (props: Props) => {
	return (
		<Row className="g-2">
			<InputGroup>
				<InputGroup.Text>
					<Icon>{Icons[PascalCase(props.name) as keyof typeof Icons]}</Icon>
				</InputGroup.Text>
				<Form.Select defaultValue={props.defaultValue}>{props.children}</Form.Select>
			</InputGroup>
		</Row>
	)
}

export default Select
