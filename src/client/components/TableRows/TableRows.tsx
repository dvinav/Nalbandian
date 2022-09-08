import React from 'react'
import Icon from '../Icon/Icon'
import Icons from '../../json/icons.json'

type Props = {
	doc: any
	row: number
	id: string
	type: number
	onContextMenu: React.MouseEventHandler
}

const TableRow: React.FC<Props> = ({ doc, row, id, type, onContextMenu }) => {
	switch (type) {
		case 1:
			return (
				<tr data-id={id} onContextMenu={onContextMenu}>
					<td>{row}</td>
					<td>{doc.member != null ? doc.member : '-'}</td>
					<td>{doc.book != null ? doc.book : '-'}</td>
					<td>sdfsdfsdf</td>
					<td>sdfsdfdsf</td>
					<td>sdfsdfdsf</td>
				</tr>
			)
			break
		case 2:
			return (
				<tr data-id={id} onContextMenu={onContextMenu}>
					<td>{row}</td>
					<td>{doc.name}</td>
					<td>{doc.surname}</td>
					<td>{doc.code}</td>
				</tr>
			)
			break
		case 3:
			return (
				<tr data-id={id} onContextMenu={onContextMenu}>
					<td>{row}</td>
					<td>{doc.title != '' ? doc.title : '-'}</td>
					<td>{doc.subtitle != '' ? doc.subtitle : '-'}</td>
					<td>{doc.author != '' ? doc.author : '-'}</td>
					<td>{doc.translator != '' ? doc.translator : '-'}</td>
					<td>{doc.code}</td>
					<td>
						<a target="blank" href={String(!doc.ebook && '')} className={String(!doc.ebook && 'disabled')}>
							<Icon>{Icons.Ebook}</Icon>
						</a>
					</td>
				</tr>
			)
			break
		default:
			return <tr />
	}
}

export default TableRow
