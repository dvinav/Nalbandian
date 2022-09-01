import React from 'react'
import Icon from '../Icon/Icon'
import Icons from '../../json/icons.json'

const BookTableRow: React.FC<{ doc: any; row: number; id: string }> = ({ doc, row, id }) => {
	return (
		<tr data-id={id}>
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
}

const MembersTableRow: React.FC<{ doc: any; row: number; id: string }> = ({ doc, row, id }) => {
	return (
		<tr data-id={id}>
			<td>{row}</td>
			<td>{doc.name}</td>
			<td>{doc.surname}</td>
			<td>{doc.code}</td>
		</tr>
	)
}

const BorrowedTableRow: React.FC<{ doc: any; row: number; id: string }> = ({ doc, row, id }) => {
	return (
		<tr data-id={id}>
			<td>{row}</td>
			<td>{doc.member != null ? doc.member : '-'}</td>
			<td>{doc.book != null ? doc.book : '-'}</td>
			<td>sdfsdfsdf</td>
			<td>sdfsdfdsf</td>
			<td>sdfsdfdsf</td>
		</tr>
	)
}

export { BookTableRow, MembersTableRow, BorrowedTableRow }
