import Icon from 'components/Icon'
import Icons from 'res/icons'
import { getString } from 'utils/get'
import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import styles from 'styles/searchbox.module.sass'

type Props = {
	onInput: React.FormEventHandler
	style?: React.CSSProperties
}

const SearchBox = React.forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
	return (
		<InputGroup className={styles.searchBoxClass} style={props.style ? props.style : {}}>
			<InputGroup.Text className={styles.searchIconClass}>
				<Icon>{Icons.search}</Icon>
			</InputGroup.Text>
			<Form.Control placeholder={getString('search')} className="shadow-none" onInput={props.onInput} ref={ref} />
		</InputGroup>
	)
})

export default SearchBox
