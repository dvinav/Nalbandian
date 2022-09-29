import * as React from 'react'
import { Table } from 'react-bootstrap'
import Icon from '@components/Icon'
import Strings from '@res/strings'
import Icons from '@res/icons'
import { Book } from '@utils/types'
import { Select, TextField } from '@components/FormControls'
import { TH } from '@components/TableComponents'
import CC from '@components/Modals/infoModal/cell'

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

const InfoModalContent = (props: Book) => {
	return (
		<Table>
			<tbody>
				<tr>
					<CC name="Title" text={props.title} />
					<CC name="Subtitle" text={props.subtitle} />
				</tr>
				<tr>
					<CC name="Author" text={props.author} />
					<CC name="Translator" text={props.translator} />
				</tr>
				<tr>
					<CC name="Publishing" text={props.publishing} />
					<CC name="PublishDate" text={props.publishDate} />
				</tr>
				<tr>
					<CC name="PublishLocation" text={props.publishLocation} />
					<CC name="Language" text={Strings[props.language]} />
				</tr>
				<tr>
					<CC name="ISBN" text={props.ISBN} />
					<CC name="BookCode" text={props.bookCode} />
				</tr>
				<tr>
					<CC span={2} name="Ebook" text={props.ebook} link />
				</tr>
			</tbody>
		</Table>
	)
}

export { FormInputs, TableHead, InfoModalContent }
