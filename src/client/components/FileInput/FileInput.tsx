import React from 'react'
import { Form, InputGroup, Row } from 'react-bootstrap'
import Icon from '../Icon/Icon'
import Strings from '../../json/strings.json'
import Icons from '../../json/icons.json'
import PascalCase from '../../utils/PascalCase'

type Props = {
	name: string
}

const FileInput = (props: Props) => {
	return (
		<Row className="g-2">
			<InputGroup>
				<InputGroup.Text>
					<Icon>{Icons[PascalCase(props.name) as keyof typeof Icons]}</Icon>
				</InputGroup.Text>
				<Form.Control type="file" name="picture" />
			</InputGroup>
		</Row>
	)
}

export default FileInput
