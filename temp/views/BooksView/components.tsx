import * as React from 'react'
import Icon from '@components/Icon'
import Strings from '@res/strings'
import Icons from '@res/icons'
import { Select, TextField } from '@components/FormControls'
import { TH } from '@components/TableComponents'

const FormInputs = (
	<>
		<TextField name="title" />
		<TextField name="subtitle" />
		<TextField name="author" />
		<TextField name="publishing" />
		<TextField name="publishDate" />
		<TextField name="publishLocation" />
		<TextField name="translator" />
		<TextField name="ISBN" />
		<Select name="language" defaultValue="hy">
			<option value="hy">{Strings.hy}</option>
			<option value="fa">{Strings.fa}</option>
			<option value="en">{Strings.en}</option>
		</Select>
		<TextField name="bookCode" />
		<TextField name="ebook" />
	</>
)

const TableHead = (
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

export { FormInputs, TableHead }
