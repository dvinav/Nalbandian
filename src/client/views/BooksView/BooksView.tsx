import * as React from 'react'
import { Table } from 'react-bootstrap'
import FormContainer from '../../layouts/FormContainer/FormContainer'
import TabContainer from '../../layouts/TabContainer/TabContainer'
import TextField from '../../components/TextField/TextField'
import TableContainer from '../../layouts/TableContainer/TableContainer'
import Strings from '../../json/strings.json'
import Icons from '../../json/icons.json'
import Icon from '../../components/Icon/Icon'
import * as Requests from '../../api/requests'
import { BookTableRow as TableRow } from '../../components/TableRows/TableRows'
import Select from '../../components/Select/Select'

type State = {
	rows: any[]
	isSearching: boolean
	currentRowId: string
}

type Props = {}

var rowIndex = 1

class BooksView extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		document.title = Strings.DocumentTitle + ': ' + Strings.Header.Books
		this.state = {
			rows: [],
			isSearching: false,
			currentRowId: '',
		}
		Requests.GetMany(20, 3, 1).then((data) => {
			this.setState({ rows: data })
		})

		rowIndex = 1
	}

	render() {
		return (
			<TabContainer>
				<FormContainer
					col={3}
					onResult={(row: object, id: string) => {
						rowIndex = 1
						this.state.rows.unshift(row)
						this.setState({ currentRowId: id })
					}}
				>
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
				</FormContainer>
				<TableContainer>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th style={{ width: '4%' }}>#</th>
								<th style={{ width: '22%' }}>{Strings.Title}</th>
								<th style={{ width: '22%' }}>{Strings.Subtitle}</th>
								<th style={{ width: '20%' }}>{Strings.Author}</th>
								<th style={{ width: '17%' }}>{Strings.Translator}</th>
								<th style={{ width: '8%' }}>{Strings.BookCode}</th>
								<th style={{ width: '4%' }}>
									<Icon>{Icons.EbookTH}</Icon>
								</th>
							</tr>
						</thead>
						<tbody>
							{this.state.rows.map((row, key) => (
								<TableRow
									doc={row}
									key={key}
									row={rowIndex++}
									id={this.state.currentRowId != '' ? this.state.currentRowId : row._id}
								/>
							))}
						</tbody>
					</Table>
				</TableContainer>
			</TabContainer>
		)
	}
}

export default BooksView
