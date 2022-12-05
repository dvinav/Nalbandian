import React from 'react'
import { TH } from 'components/TableComponents'
import Icon from 'components/Icon'
import Icons from 'res/icons'
import { getString } from 'utils/get'

const books = (
	<>
		<TH width="4%">#</TH>
		<TH width="22%">{getString('title')}</TH>
		<TH width="22%">{getString('subtitle')}</TH>
		<TH width="20%">{getString('author')}</TH>
		<TH width="17%">{getString('translator')}</TH>
		<TH width="8%">{getString('bookCode')}</TH>
		<TH width="4%">
			<Icon>{Icons.ebookTH}</Icon>
		</TH>
	</>
)

const members = (
	<>
		<TH width="4%">#</TH>
		<TH width="44%">{getString('name')}</TH>
		<TH width="44%">{getString('surname')}</TH>
		<TH width="8%">{getString('memberCode')}</TH>
	</>
)

export { books, members }
