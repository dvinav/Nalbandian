import { CollectionNumbers, Doc } from '@utils/types'

export type Request = 'getMany' | 'getByQuery' | 'getOne' | 'delete'

export type Insert = Doc & {
	collection?: CollectionNumbers
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

export type Edit = {
	id: string
	fd: Doc & {
		collection?: CollectionNumbers
	}
}
