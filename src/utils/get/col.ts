import { CollectionNumbers, CollectionNames, Collections } from 'types/general'

function getCol(p: CollectionNames): CollectionNumbers

function getCol(p: CollectionNumbers): CollectionNames

function getCol(p: Collections): Collections {
	switch (p) {
		case 'borrowed':
			return 1 as CollectionNumbers
			break
		case 'members':
			return 2 as CollectionNumbers
			break
		case 'books':
			return 3 as CollectionNumbers
			break
		case 1:
			return 'borrowed' as CollectionNames
			break
		case 2:
			return 'members' as CollectionNames
			break
		case 3:
			return 'books' as CollectionNames
			break
	}
}

export default getCol
