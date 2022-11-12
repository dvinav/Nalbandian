import { Book, Member, Borrowed } from 'types/documents'

const books: Book = {
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

const members: Member = {
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

export { books, members, borrowed }
