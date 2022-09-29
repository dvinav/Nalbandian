import * as React from 'react'
import Strings from '@res/strings'
import { Table } from 'react-bootstrap'
import { TextField } from '@components/FormControls'
import { TH } from '@components/TableComponents'
import { Borrowed } from '@utils/types'

const FormInputs = (
	<>
		<TextField name="member" />
		<TextField name="book" />
	</>
)

const TableHead = (
	<>
		<TH width="4%">#</TH>
		<TH width="25%">{Strings.name}</TH>
		<TH width="26%">{Strings.book}</TH>
		<TH width="15%">{Strings.date}</TH>
		<TH width="15%">{Strings.deadline}</TH>
		<TH width="15%">{Strings.return}</TH>
	</>
)

const InfoModalContent = (props: Borrowed) => {
	return <></>
}

export { FormInputs, TableHead, InfoModalContent }
