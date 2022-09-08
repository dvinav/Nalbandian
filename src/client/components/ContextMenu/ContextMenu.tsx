import React, { useState } from 'react'
import './ContextMenu.scss'
import { Dropdown } from 'react-bootstrap'
import Icon from '../Icon/Icon'
import Strings from '../../json/strings.json'
import Icons from '../../json/icons.json'
import { Delete as DeleteDocument } from '../../api/requests'

var currentPos = [0, 0]

const CSS = (vis: boolean, pos: number[]): object => {
	if (vis) {
		if (pos[0] > -1 && pos[1] > -1) {
			currentPos = [pos[0], pos[1]]
			console.log('lak lak')
			return {
				pointerEvents: 'all',
				opacity: 1,
				top: pos[1] + 'px',
				left: pos[0] + 'px',
			}
		} else
			return {
				pointerEvents: 'all',
				opacity: 1,
				top: currentPos[1] + 'px',
				left: currentPos[0] + 'px',
			}
	} else
		return {
			pointerEvents: 'none',
			opacity: 0,
			top: currentPos[1] + 'px',
			left: currentPos[0] + 'px',
		}
}

type Props = {
	col: number
	id: string
	show: boolean
	pos: number[]
	onDelete: Function
}

const ContextMenu = React.forwardRef<HTMLDivElement, Props>((props: Props, ref) => (
	<Dropdown className="contextMenu" style={CSS(props.show, props.pos)} show={true} ref={ref}>
		<Dropdown.Menu>
			<Dropdown.Item>
				<Icon>{Icons.Edit}</Icon>
				{Strings.Edit}
			</Dropdown.Item>
			<Dropdown.Item onClick={() => DeleteDocument(props.col, props.id, props.onDelete)}>
				<Icon>{Icons.Delete}</Icon>
				{Strings.Delete}
			</Dropdown.Item>
		</Dropdown.Menu>
	</Dropdown>
))

export default ContextMenu
