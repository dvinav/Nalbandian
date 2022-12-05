import React from 'react'
import { Table } from 'react-bootstrap'
import { Book, Borrowed, Doc, Member } from 'types/documents'
import { getString } from 'utils/get'
import CC from 'components/Modals/infoModal/cell'
import { CollectionNames } from 'types/general'
import styles from 'styles/modals.module.sass'
import { MonthNames } from 'res/months'
import { getEmptyData } from 'utils/get'

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

const formatDate = (d: string): string => {
	var arr = d.split('/')
	var d = arr[0]
	var m = arr[1]
	var i = Number(m[0] == '0' ? m.replace('0', '') : m) - 1
	var y = arr[2]
	return d + ' ' + MonthNames[i] + ' ' + y
}

const uoe = (str: string): boolean => {
	if (!str || str == '') return false
	else return true
}

const Member: React.FC<{ doc: Member }> = ({ doc }) => {
	return (
		<div>
			<div className={styles.pictureContainer}>
				<img src={uoe(doc.picture) ? `/getImage/${doc.picture}` : '/img/nopic.png'} />
			</div>
			<div className={styles.tableContainer}>
				<Table>
					<tbody>
						<tr>
							<CC name="name" text={doc.name} />
							<CC name="surname" text={doc.surname} />
						</tr>
						<tr>
							<CC name="birthdate" text={formatDate(doc.birthdate)} />
							<CC name="phone" text={doc.phone} />
						</tr>
						<tr>
							<CC name="home" text={doc.home} />
							<CC name="memberCode" text={doc.memberCode} />
						</tr>
						<tr>
							<CC name="address" text={doc.address} />
						</tr>
					</tbody>
				</Table>
			</div>
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
			return <Borrowed doc={getEmptyData('borrowed') as Borrowed} />
			break
	}
}

export default Layout
