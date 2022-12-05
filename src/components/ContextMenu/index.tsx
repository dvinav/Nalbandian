import React, { useRef, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import Icon from 'components/Icon'
import { getIcon, getString } from 'utils/get'
import styles from 'styles/ctxmenu.module.sass'
import { Position } from 'types/general'
import e from 'cors'

type Props = {
	event: React.MouseEvent | undefined
	delete: Function
	edit: Function
	extRef: React.RefObject<HTMLDivElement>
	noctx?: boolean
}

class ContextMenu extends React.PureComponent<Props> {
	constructor(p: Props) {
		super(p)
	}

	currentPos = [0, 0]

	checkPos = (): boolean => {
		if (this.props.event) return this.props.event.clientX > 0 && this.props.event.clientY > 0
		else return false
	}

	setStyle = (): React.CSSProperties => {
		if (this.props.event) {
			var pos = [this.props.event.clientX, this.props.event.clientY]
			this.currentPos = pos
			if (!this.props.extRef.current?.contains(this.props.event.target as Node) && this.checkPos()) {
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
					top: pos[1] + 'px',
					left: pos[0] + 'px',
				}
		} else
			return {
				top: this.currentPos[1] + 'px',
				left: this.currentPos[0] + 'px',
				opacity: '0',
				pointerEvents: 'none',
			}
	}

	render() {
		return (
			<div className={styles.contextMenuClass} style={this.setStyle()} ref={this.props.extRef}>
				<ul className={styles.listClass}>
					{!this.props.noctx ? (
						<li onClick={() => this.props.edit()}>
							<Icon>{getIcon('edit')}</Icon>
							{getString('edit')}
						</li>
					) : (
						<></>
					)}

					<li onClick={() => this.props.delete()}>
						<Icon>{getIcon('delete')}</Icon>
						{getString('delete')}
					</li>
				</ul>
			</div>
		)
	}
}

export default ContextMenu
