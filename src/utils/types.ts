export type Member = {
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
	bookID: string
	memberID: string
	borrowDate: string
	deadline: string
	returnDate: string
}

export type Doc = Member | Book | Borrowed

export type FormStates = 0 | 1 | 2 // 0 = disabled, 1 = add mode, 2 = edit mode

export type CollectionNumbers = 1 | 2 | 3 // 1 = Borrowed, 2 = Members, 3 = Books, based on tab arrangements

export type CollectionNames = 'borrowed' | 'books' | 'members'

export type Collections = CollectionNumbers | CollectionNames

export type ViewStates = {
	infoModal: {
		show: boolean
		infoID?: string
		data: Doc
	}
}

export type Request = 'getMany' | 'getByQuery' | 'getOne' | 'delete'

export namespace RequestBody {
	export type Insert = {
		fd: Doc & {
			collection?: CollectionNumbers
		}
	}

	export type GetMany = {
		count: number
		collection: CollectionNumbers
		skip: number
	}

	export type GetByQuery = {
		query: string
		collection: CollectionNumbers
	}

	export type GetOne = {
		id: string
		collection: CollectionNumbers
	}

	export type Delete = {
		id: string
		collection: CollectionNumbers
	}
}
