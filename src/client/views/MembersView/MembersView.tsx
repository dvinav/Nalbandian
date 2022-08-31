import * as React from 'react'
import { Row, Table } from 'react-bootstrap'
import FormContainer from '../../layouts/FormContainer/FormContainer'
import TabContainer from '../../layouts/TabContainer/TabContainer'
import TextField from '../../components/TextField/TextField'
import TableContainer from '../../layouts/TableContainer/TableContainer'
import Strings from '../../json/strings.json'

class Members extends React.Component {
	render() {
		return (
			<TabContainer>
				<FormContainer>
					<Row className="g-2">
						<TextField name="name"></TextField>
					</Row>
					<Row className="g-2">
						<TextField name="surname"></TextField>
					</Row>
					<Row className="g-2">
						<TextField name="birthdate"></TextField>
					</Row>
					<Row className="g-2">
						<TextField name="phone"></TextField>
					</Row>
					<Row className="g-2">
						<TextField name="home"></TextField>
					</Row>
					<Row className="g-2">
						<TextField name="address"></TextField>
					</Row>
					<Row className="g-2">
						<TextField name="memberCode"></TextField>
					</Row>
				</FormContainer>
				<TableContainer>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th style={{ width: '4%' }}>#</th>
								<th style={{ width: '44%' }}>{Strings.Name}</th>
								<th style={{ width: '44%' }}>
									{Strings.Surname}
								</th>
								<th style={{ width: '8%' }}>
									{Strings.MemberCode}
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

export default Members
