import Icon from 'components/Icon'
import Icons from 'res/icons'
import React from 'react'
import styles from 'styles/table.module.sass'

type Props = {
	doc: any
	row: number
	id: string
	type: number
	onContextMenu: React.MouseEventHandler
	onClick: React.MouseEventHandler
}

export default (props: Props) => {
	switch (props.type) {
		case 1:
			return (
				<tr data-id={props.id} onContextMenu={props.onContextMenu} onClick={props.onClick}>
					<td>{props.row}</td>
					<td>{props.doc.member != null ? props.doc.member : '-'}</td>
					<td>{props.doc.book != null ? props.doc.book : '-'}</td>
					<td>sdfsdfsdf</td>
					<td>sdfsdfdsf</td>
					<td>sdfsdfdsf</td>
				</tr>
			)
			break
		case 2:
			return (
				<tr data-id={props.id} onContextMenu={props.onContextMenu} onClick={props.onClick}>
					<td>{props.row}</td>
					<td>{props.doc.name}</td>
					<td>{props.doc.surname}</td>
					<td>{props.doc.memberCode}</td>
				</tr>
			)
			break
		case 3:
			return (
				<tr data-id={props.id} onContextMenu={props.onContextMenu} onClick={props.onClick}>
					<td>{props.row}</td>
					<td>{props.doc.title != '' ? props.doc.title : '-'}</td>
					<td>{props.doc.subtitle != '' ? props.doc.subtitle : '-'}</td>
					<td>{props.doc.author != '' ? props.doc.author : '-'}</td>
					<td>{props.doc.translator != '' ? props.doc.translator : '-'}</td>
					<td>{props.doc.code}</td>
					<td>
						<a target="blank" href={props.doc.ebook} className={String(!props.doc.ebook && styles.disabledLink)}>
							<Icon>{Icons.ebook}</Icon>
						</a>
					</td>
				</tr>
			)
			break
		default:
			return <tr />
	}
}
