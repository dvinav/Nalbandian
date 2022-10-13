export type Member = {
	_id?: string
	name: string
	surname: string
	birthdate: string
	phone: string
	home: string
	address: string
	memberCode: string
	picture: string
}

export type Book = {
	_id?: string
	title: string
	subtitle: string
	author: string
	translator: string
	publishing: string
	publishDate: string
	publishLocation: string
	language: string
	ISBN: string
	bookCode: string
	ebook: string
}

export type Borrowed = {
	_id?: string
	bookID: string
	memberID: string
	borrowDate: string
	deadline: string
	returnDate: string
}

export type Doc = Member | Book | Borrowed
