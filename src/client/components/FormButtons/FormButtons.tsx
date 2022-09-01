import React, { MouseEventHandler } from 'react'
import { Button } from 'react-bootstrap'
import Icon from '../Icon/Icon'
import Strings from '../../json/strings.json'
import Icons from '../../json/icons.json'

type Props = {
	onClick: MouseEventHandler<HTMLButtonElement>
	disabled: boolean
}

const AddButton = (props: Props) => {
	return (
		<Button variant="primary" className="addBtn" onClick={props.onClick} disabled={props.disabled}>
			<Icon>{Icons.Add}</Icon>
			{Strings.Add}
		</Button>
	)
}

const ClearButton = (props: Props) => {
	return (
		<Button variant="primary" className="clearBtn" onClick={props.onClick} disabled={props.disabled}>
			<Icon>{Icons.Clear}</Icon>
			{Strings.Clear}
		</Button>
	)
}

const SubmitButton = (props: Props) => {
	return (
		<Button variant="success" type="submit" onClick={props.onClick} disabled={props.disabled}>
			<Icon>{Icons.Submit}</Icon>
			{Strings.Submit}
		</Button>
	)
}

const CancelButton = (props: Props) => {
	return (
		<Button variant="danger" onClick={props.onClick} disabled={props.disabled}>
			<Icon>{Icons.Cancel}</Icon>
			{Strings.Cancel}
		</Button>
	)
}

export { AddButton, ClearButton, CancelButton, SubmitButton }
