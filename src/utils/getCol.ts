import { CollectionNumbers, CollectionNames, Collections } from '@utils/types'

const getCol = (p: Collections): CollectionNumbers | CollectionNames => {
	switch (p) {
		case 1:
			return 'borrowed' as CollectionNames
			break
		case 2:
			return 'members' as CollectionNames
			break
		case 3:
			return 'books' as CollectionNames
			break
		case 'borrowed':
			return 1 as CollectionNumbers
			break
		case 'members':
			return 2 as CollectionNumbers
			break
		case 'books':
			return 3 as CollectionNumbers
			break
	}
}

export default getCol
