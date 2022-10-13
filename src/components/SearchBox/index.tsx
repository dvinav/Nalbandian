import Icon from 'components/Icon'
import Icons from 'res/icons'
import Strings from 'res/strings'
import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import styles from 'styles/searchbox.module.sass'

type Props = {
	onInput: React.FormEventHandler
}

const SearchBox = React.forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
	return (
		<InputGroup className={styles.searchBoxClass}>
			<InputGroup.Text className={styles.searchIconClass}>
				<Icon>{Icons.search}</Icon>
			</InputGroup.Text>
			<Form.Control placeholder={Strings.search} className="shadow-none" onInput={props.onInput} ref={ref} />
		</InputGroup>
	)
})

export default SearchBox
