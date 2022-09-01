import * as React from 'react'
import { Table } from 'react-bootstrap'
import FormContainer from '../../layouts/FormContainer/FormContainer'
import TabContainer from '../../layouts/TabContainer/TabContainer'
import TextField from '../../components/TextField/TextField'
import TableContainer from '../../layouts/TableContainer/TableContainer'
import Strings from '../../json/strings.json'
import * as Requests from '../../api/requests'
import { BorrowedTableRow as TableRow } from '../../components/TableRows/TableRows'

type State = {
	rows: any[]
	isSearching: boolean
	currentRowId: string
}

type Props = {}

var rowIndex = 1

class Borrowed extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		document.title = Strings.DocumentTitle + ': ' + Strings.Header.Borrowed
		this.state = {
			rows: [],
			isSearching: false,
			currentRowId: '',
		}
		Requests.GetMany(20, 1, 1).then((data) => {
			this.setState({ rows: data })
		})

		rowIndex = 1
	}
	render() {
		return (
			<TabContainer>
				<FormContainer
					col={1}
					onResult={(row: object, id: string) => {
						rowIndex = 1
						this.state.rows.unshift(row)
						this.setState({ currentRowId: id })
					}}
				>
					<TextField name="member"></TextField>
					<TextField name="book"></TextField>
				</FormContainer>
				<TableContainer>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th style={{ width: '4%' }}>#</th>
								<th style={{ width: '25%' }}>{Strings.Name}</th>
								<th style={{ width: '26%' }}>{Strings.Book}</th>
								<th style={{ width: '15%' }}>{Strings.Date}</th>
								<th style={{ width: '15%' }}>{Strings.Deadline}</th>
								<th style={{ width: '15%' }}>{Strings.Return}</th>
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

export default Borrowed
