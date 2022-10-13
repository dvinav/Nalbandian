import React from 'react'
import BookInfo from './bookInfo'
import MemberInfo from './memberInfo'
import BorrowedInfo from './borrowedInfo'
import { InfoLayouts, Doc } from '@utils/types'

type Props = {
	ref: string
	doc: Doc
}

const Info = (p: Props) => {
	switch (p.ref) {
		case 'bookInfo':
			return <BookInfo doc={p.doc} />
			break
		case 'memberInfo':
			return <MemberInfo doc={p.doc} />
			break
		case 'borrowedInfo':
			return <BorrowedInfo doc={p.doc} />
			break
	}
}

export default Info
