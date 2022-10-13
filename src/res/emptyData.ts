import { Book, Member, Borrowed } from 'types/documents'

const book: Book = {
	title: '-',
	author: '-',
	subtitle: '-',
	bookCode: '-',
	language: '-',
	publishDate: '-',
	ISBN: '-',
	ebook: '-',
	translator: '-',
	publishLocation: '-',
	publishing: '-',
}

const member: Member = {
	address: '-',
	name: '-',
	surname: '-',
	birthdate: '-',
	phone: '-',
	home: '-',
	memberCode: '-',
	picture: '',
}

const borrowed: Borrowed = {
	bookID: '-',
	memberID: '-',
	borrowDate: '-',
	deadline: '-',
	returnDate: '-',
}

export { book, member, borrowed }
