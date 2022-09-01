import React from 'react'
import { InputGroup, Form, Row } from 'react-bootstrap'
import Icon from '../Icon/Icon'
import Strings from '../../json/strings.json'
import Icons from '../../json/icons.json'
import PascalCase from '../../utils/PascalCase'

const TextField: React.FC<{ name: string }> = ({ name }) => {
	return (
		<Row className="g-2">
			<InputGroup>
				<InputGroup.Text>
					<Icon>{Icons[PascalCase(name) as keyof typeof Icons]}</Icon>
				</InputGroup.Text>
				<Form.Control placeholder={Strings[PascalCase(name) as keyof typeof Strings] as string} name={name} />
			</InputGroup>
		</Row>
	)
}

export default TextField
