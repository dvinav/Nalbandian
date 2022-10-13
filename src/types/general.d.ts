export type CollectionNumbers = 1 | 2 | 3 // 1 = Borrowed, 2 = Members, 3 = Books, based on tab arrangements

export type CollectionNames = 'borrowed' | 'books' | 'members'

export type InfoLayouts = 'borrowedInfo' | 'bookInfo' | 'memberInfo'

export type Collections = CollectionNumbers | CollectionNames

export type Position = [number, number]
