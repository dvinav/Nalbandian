import React, { useRef, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import Icon from 'components/Icon'
import { getIcon, getString } from 'utils/get'
import styles from 'styles/ctxmenu.module.sass'
import { Position } from 'types/general'

type Props = {
	data:
		| {
				pos: Position
				target: Node
		  }
		| undefined
	delete: Function
	edit: Function
	ref: React.ForwardedRef<HTMLDivElement>
}

/* var currentPos = [0, 0]

const CSS = (vis: boolean, e: React.MouseEvent, ref: React.RefObject<HTMLDivElement>): object => {
	var pos = [e.clientX, e.clientY]

	if (!ref.current?.contains(e.target as Node) && vis) {
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
	event: React.MouseEvent
	delete: Function
	edit: Function
}

const ContextMenu = (p: Props) => {
	const [isOpen, show] = useState(false)

	const ref = useRef()

	p.event.preventDefault()

	return (
		<Dropdown className={styles.contextMenuClass} style={CSS(isOpen, p.event, ref)} show={true} ref={ref}>
			<Dropdown.Menu className={styles.dropdownMenuClass}>
				<Dropdown.Item onClick={() => p.edit()}>
					<Icon>{getIcon()}</Icon>
					{Strings.edit}
				</Dropdown.Item>
				<Dropdown.Item onClick={() => p.delete()}>
					<Icon>{Icons.delete}</Icon>
					{Strings.delete}
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	)
}
 */
class ContextMenu extends React.PureComponent<Props> {
	constructor(p: Props) {
		super(p)

		this.state = {
			pos: [0, 0],
		}
	}

	/* componentDidUpdate(): void {
		if (this.ref.current && this.props.data) {
			if (this.props.data.pos && !this.ref.current?.contains(this.props.data.target)) {
				if (this.props.data.pos[1] > 0 && this.props.data.pos[0] > 0) {
					this.ref.current.style.pointerEvents = 'all'
					this.ref.current.style.opacity = '1'
					this.ref.current.style.top = this.props.data.pos[1] + 'px'
					this.ref.current.style.left = this.props.data.pos[0] + 'px'
				} else {
					this.ref.current.style.pointerEvents = 'none'
					this.ref.current.style.opacity = '0'
					this.ref.current.style.top = this.props.data.pos[1] + 'px'
					this.ref.current.style.left = this.props.data.pos[0] + 'px'
				}
			} else {
				this.ref.current.style.pointerEvents = 'none'
				this.ref.current.style.opacity = '0'
				this.ref.current.style.top = this.props.data.pos[1] + 'px'
				this.ref.current.style.left = this.props.data.pos[0] + 'px'
			}
		}
	} */

	checkPos = (): boolean => {
		if (this.props.data) return this.props.data.pos[0] > 0 && this.props.data.pos[1] > 0
		else return false
	}

	render() {
		return (
			<Dropdown className={styles.contextMenuClass} show={this.checkPos()} ref={this.props.ref}>
				<Dropdown.Menu className={styles.dropdownMenuClass}>
					<Dropdown.Item onClick={() => this.props.edit()}>
						<Icon>{getIcon('edit')}</Icon>
						{getString('edit')}
					</Dropdown.Item>
					<Dropdown.Item onClick={() => this.props.delete()}>
						<Icon>{getIcon('delete')}</Icon>
						{getString('delete')}
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		)
	}
}

export default React.forwardRef((props, ref) => <ContextMenu ref={ref} {...props} />)
