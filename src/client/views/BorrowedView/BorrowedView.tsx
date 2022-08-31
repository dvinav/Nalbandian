import * as React from 'react'
import { Row, Table } from 'react-bootstrap'
import FormContainer from '../../layouts/FormContainer/FormContainer'
import TabContainer from '../../layouts/TabContainer/TabContainer'
import TextField from '../../components/TextField/TextField'
import TableContainer from '../../layouts/TableContainer/TableContainer'
import Strings from '../../json/strings.json'

class Borrowed extends React.Component {
	render() {
		return (
			<TabContainer>
				<FormContainer /* onSubmit={UI.Submit} */>
					<Row className="g-2">
						<TextField name="member"></TextField>
					</Row>
					<Row className="g-2">
						<TextField name="book"></TextField>
					</Row>
				</FormContainer>
				<TableContainer>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th style={{ width: '4%' }}>#</th>
								<th style={{ width: '25%' }}>{Strings.Name}</th>
								<th style={{ width: '26%' }}>{Strings.Book}</th>
								<th style={{ width: '15%' }}>{Strings.Date}</th>
								<th style={{ width: '15%' }}>
									{Strings.Deadline}
								</th>
								<th style={{ width: '15%' }}>
									{Strings.Return}
								</th>
							</tr>
						</thead>
						<tbody></tbody>
					</Table>
				</TableContainer>
			</TabContainer>
		)
	}
}

export default Borrowed
