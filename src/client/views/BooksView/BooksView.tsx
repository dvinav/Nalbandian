import * as React from 'react'
import TextField from '../../components/TextField/TextField'
import Strings from '../../json/strings.json'
import Icons from '../../json/icons.json'
import Icon from '../../components/Icon/Icon'
import Select from '../../components/Select/Select'
import TH from '../../components/TH/TH'
import ViewLayout from '../../layouts/ViewLayout/ViewLayout'

const BooksView = () => {
	return (
		<ViewLayout
			name="books"
			formInputs={
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
						<option value="hy">{Strings.Armenian}</option>
						<option value="fa">{Strings.Persian}</option>
						<option value="en">{Strings.English}</option>
					</Select>
					<TextField name="bookCode" />
					<TextField name="ebook" />
				</>
			}
			tableHead={
				<>
					<TH width="4%">#</TH>
					<TH width="22%">{Strings.Title}</TH>
					<TH width="22%">{Strings.Subtitle}</TH>
					<TH width="20%">{Strings.Author}</TH>
					<TH width="17%">{Strings.Translator}</TH>
					<TH width="8%">{Strings.BookCode}</TH>
					<TH width="4%">
						<Icon>{Icons.EbookTH}</Icon>
					</TH>
				</>
			}
		/>
	)
}

export default BooksView
