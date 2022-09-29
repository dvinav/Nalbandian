import React from 'react'
import './index.css'
import { Dropdown } from 'react-bootstrap'
import Icon from '@components/Icon'
import Icons from '@res/icons'
import Strings from '@res/strings'

var currentPos = [0, 0]

const CSS = (vis: boolean, pos: number[]): object => {
	if (vis) {
		if (pos[0] > -1 && pos[1] > -1) {
			currentPos = [pos[0], pos[1]]
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
	show: boolean
	pos: number[]
	onDeleteClick: React.MouseEventHandler
	onEditClick: React.MouseEventHandler
}

const ContextMenu = React.forwardRef<HTMLDivElement, Props>((props: Props, ref) => (
	<Dropdown className="contextMenu" style={CSS(props.show, props.pos)} show={true} ref={ref}>
		<Dropdown.Menu>
			<Dropdown.Item onClick={props.onEditClick}>
				<Icon>{Icons.edit}</Icon>
				{Strings.edit}
			</Dropdown.Item>
			<Dropdown.Item onClick={props.onDeleteClick}>
				<Icon>{Icons.delete}</Icon>
				{Strings.delete}
			</Dropdown.Item>
		</Dropdown.Menu>
	</Dropdown>
))

export default ContextMenu
