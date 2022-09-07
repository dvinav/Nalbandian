import React, { FormEventHandler } from 'react'
import Strings from '../../json/strings.json'
import Icons from '../../json/icons.json'
import Icon from '../Icon/Icon'
import { Form, InputGroup } from 'react-bootstrap'
import './SearchBox.scss'

type Props = {
	onInput: FormEventHandler
}

const SearchBox = React.forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
	return (
		<InputGroup className="searchBox">
			<InputGroup.Text>
				<Icon>{Icons.Search}</Icon>
			</InputGroup.Text>
			<Form.Control placeholder={Strings.Search} className="shadow-none" onInput={props.onInput} ref={ref} />
		</InputGroup>
	)
})

export default SearchBox
