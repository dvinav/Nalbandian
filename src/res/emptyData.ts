import { Book, Member, Borrowed } from 'types/documents'

const books: Book = {
	_id: '',
	title: '-',
	author: '-',
	subtitle: '-',
	code: '-',
	language: '-',
	publishDate: '-',
	ISBN: '-',
	ebook: '-',
	translator: '-',
	publishLocation: '-',
	publishing: '-',
}

const members: Member = {
	_id: '',
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
	_id: '',
	book: '-',
	member: '-',
	borrowDate: '-',
	returnDate: '-',
}

export { books, members, borrowed }
