import React from 'react'
import Icon from '../Icon/Icon'
import Icons from '../../json/icons.json'

const BookTableRow: React.FC<{ doc: any; row: number }> = ({ doc, row }) => {
	return (
		<tr data-id={doc._id}>
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

export { BookTableRow }
