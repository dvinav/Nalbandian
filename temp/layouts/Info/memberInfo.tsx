import React from 'react'
import { Table } from 'react-bootstrap'
import { Book } from '@utils/types'
import { Strings } from '@res/strings'
import CC from '@components/Modals/infoModal/cell'

const bookInfo: React.FC<{ doc: Book }> = ({ doc }) => {
	return (
		<Table>
			<tbody>
				<tr>
					<CC name="title" text={doc.title} />
					<CC name="subtitle" text={doc.subtitle} />
				</tr>
				<tr>
					<CC name="author" text={doc.author} />
					<CC name="translator" text={doc.translator} />
				</tr>
				<tr>
					<CC name="publishing" text={doc.publishing} />
					<CC name="publishDate" text={doc.publishDate} />
				</tr>
				<tr>
					<CC name="publishLocation" text={doc.publishLocation} />
					<CC name="language" text={Strings[doc.language]} />
				</tr>
				<tr>
					<CC name="ISBN" text={doc.ISBN} />
					<CC name="bookCode" text={doc.bookCode} />
				</tr>
				<tr>
					<CC span={2} name="ebook" text={doc.ebook} link />
				</tr>
			</tbody>
		</Table>
	)
}

export default bookInfo
