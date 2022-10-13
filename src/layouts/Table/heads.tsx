import React from 'react'
import { TH } from 'components/TableComponents'
import Icon from 'components/Icon'
import Strings from 'res/strings'
import Icons from 'res/icons'

const books = (
	<>
		<TH width="4%">#</TH>
		<TH width="22%">{Strings.title}</TH>
		<TH width="22%">{Strings.subtitle}</TH>
		<TH width="20%">{Strings.author}</TH>
		<TH width="17%">{Strings.translator}</TH>
		<TH width="8%">{Strings.bookCode}</TH>
		<TH width="4%">
			<Icon>{Icons.ebookTH}</Icon>
		</TH>
	</>
)

const members = (
	<>
		<TH width="4%">#</TH>
		<TH width="44%">{Strings.name}</TH>
		<TH width="44%">{Strings.surname}</TH>
		<TH width="8%">{Strings.memberCode}</TH>
	</>
)

const borrowed = (
	<>
		<TH width="4%">#</TH>
		<TH width="25%">{Strings.name}</TH>
		<TH width="26%">{Strings.book}</TH>
		<TH width="15%">{Strings.date}</TH>
		<TH width="15%">{Strings.deadline}</TH>
		<TH width="15%">{Strings.return}</TH>
	</>
)

export { books, members, borrowed }
