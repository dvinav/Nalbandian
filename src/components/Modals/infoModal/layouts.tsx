import React from 'react'
import { Table } from 'react-bootstrap'
import { Book, Borrowed, Doc, Member } from 'types/documents'
import { getString } from 'utils/get'
import CC from 'components/Modals/infoModal/cell'
import { CollectionNames } from 'types/general'
import styles from 'styles/modals.module.sass'

const Book: React.FC<{ doc: Book }> = ({ doc }) => {
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
					<CC name="language" text={getString(doc.language)} />
				</tr>
				<tr>
					<CC name="ISBN" text={doc.ISBN} />
					<CC name="bookCode" text={doc.code} />
				</tr>
				<tr>
					<CC span={2} name="ebook" text={doc.ebook} link />
				</tr>
			</tbody>
		</Table>
	)
}

const Member: React.FC<{ doc: Member }> = ({ doc }) => {
	return (
		<div className="memberInfoContainer">
			<div className={styles.pictureContainer}>
				<img src={doc.picture != '' ? `uploads/${doc.picture}` : '/img/nopic.png'} />
			</div>
			<Table>
				<tbody>
					<tr>
						<CC name="name" text={doc.name} />
						<CC name="surname" text={doc.surname} />
					</tr>
					<tr>
						<CC name="birthdate" text={doc.birthdate} />
						<CC name="phone" text={doc.phone} />
					</tr>
					<tr>
						<CC name="home" text={doc.home} />
						<CC name="memberCode" text={doc.code} />
					</tr>
					<tr>
						<CC name="address" text={doc.address} />
					</tr>
				</tbody>
			</Table>
		</div>
	)
}

const Borrowed: React.FC<{ doc: Borrowed }> = ({ doc }) => {
	return <></>
}

type LayoutProps = {
	name: CollectionNames
	doc: Doc
}

const Layout = (p: LayoutProps) => {
	switch (p.name) {
		case 'books':
			return <Book doc={p.doc as Book} />
			break
		case 'members':
			return <Member doc={p.doc as Member} />
			break
		case 'borrowed':
			return <Borrowed doc={p.doc as Borrowed} />
			break
	}
}

export default Layout
