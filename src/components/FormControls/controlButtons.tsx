import React from 'react'
import { Button } from 'react-bootstrap'
import Icon from 'components/Icon'
import { getString, getIcon } from 'utils/get'

type Props = {
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	disabled: boolean
}

export default {
	AddButton: (props: Props) => {
		return (
			<Button variant="primary" onClick={props.onClick} disabled={props.disabled}>
				<Icon>{getIcon('add')}</Icon>
				{getString('add')}
			</Button>
		)
	},
	ClearButton: (props: Props) => {
		return (
			<Button variant="primary" onClick={props.onClick} disabled={props.disabled}>
				<Icon>{getIcon('clear')}</Icon>
				{getString('clear')}
			</Button>
		)
	},
	SubmitButton: (props: Props) => {
		return (
			<Button variant="success" type="submit" onClick={props.onClick} disabled={props.disabled}>
				<Icon>{getIcon('submit')}</Icon>
				{getString('submit')}
			</Button>
		)
	},
	CancelButton: (props: Props) => {
		return (
			<Button variant="danger" onClick={props.onClick} disabled={props.disabled}>
				<Icon>{getIcon('cancel')}</Icon>
				{getString('cancel')}
			</Button>
		)
	},
}
