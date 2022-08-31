import React from 'react'
import Strings from '../../json/strings.json'
import Icons from '../../json/icons.json'
import Icon from '../Icon/Icon'
import { Form, InputGroup } from 'react-bootstrap'
import './SearchBox.scss'

const SearchBox = () => {
	return (
		<InputGroup className="searchBox">
			<InputGroup.Text>
				<Icon>{Icons.Search}</Icon>
			</InputGroup.Text>
			<Form.Control placeholder={Strings.Search} />
		</InputGroup>
	)
}

export default SearchBox
