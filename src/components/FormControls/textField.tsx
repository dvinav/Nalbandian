import React from 'react'
import { InputGroup, Form, Row } from 'react-bootstrap'
import Icon from 'components/Icon'
import { getIcon, getString } from 'utils/get'
import styles from 'styles/form.module.sass'
import dateFormat from 'utils/dateFormat'

type Props = {
	name: string
	number?: boolean
	date?: boolean
	noedit?: boolean
	value?: string
	onClick?(): void
	reference?: React.RefObject<HTMLInputElement>
}

export default (p: Props) => {
	return (
		<Row className={'g-2 ' + styles.rowClass}>
			<InputGroup>
				<InputGroup.Text>
					<Icon>{getIcon(p.name)}</Icon>
				</InputGroup.Text>
				<Form.Control
					spellCheck={false}
					placeholder={getString(p.name)}
					name={p.name}
					type={p.number ? 'number' : 'text'}
					required={p.date ? true : false}
					className={p.date ? styles.dateInput : ''}
					style={p.noedit ? { caretColor: 'transparent' } : {}}
					ref={p.reference ? p.reference : null}
					onClick={p.onClick ? p.onClick : () => {}}
					onKeyDown={(e) => {
						if (p.date) dateFormat(e)
						else if (p.noedit) {
							e.preventDefault()
						}
					}}
				/>
			</InputGroup>
		</Row>
	)
}
