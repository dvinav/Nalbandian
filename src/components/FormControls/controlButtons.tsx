import React from 'react'
import { Button } from 'react-bootstrap'
import Icon from '@components/Icon'
import Icons from '@res/icons'
import Strings from '@res/strings'

type Props = {
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	disabled: boolean
}

export default {
	AddButton: (props: Props) => {
		return (
			<Button variant="primary" className="addBtn" onClick={props.onClick} disabled={props.disabled}>
				<Icon>{Icons.add}</Icon>
				{Strings.add}
			</Button>
		)
	},
	ClearButton: (props: Props) => {
		return (
			<Button variant="primary" className="clearBtn" onClick={props.onClick} disabled={props.disabled}>
				<Icon>{Icons.clear}</Icon>
				{Strings.clear}
			</Button>
		)
	},
	SubmitButton: (props: Props) => {
		return (
			<Button variant="success" type="submit" onClick={props.onClick} disabled={props.disabled}>
				<Icon>{Icons.submit}</Icon>
				{Strings.submit}
			</Button>
		)
	},
	CancelButton: (props: Props) => {
		return (
			<Button variant="danger" onClick={props.onClick} disabled={props.disabled}>
				<Icon>{Icons.cancel}</Icon>
				{Strings.cancel}
			</Button>
		)
	},
}
