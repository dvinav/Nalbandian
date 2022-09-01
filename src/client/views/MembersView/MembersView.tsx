import * as React from 'react'
import { Table } from 'react-bootstrap'
import FormContainer from '../../layouts/FormContainer/FormContainer'
import TabContainer from '../../layouts/TabContainer/TabContainer'
import TextField from '../../components/TextField/TextField'
import TableContainer from '../../layouts/TableContainer/TableContainer'
import Strings from '../../json/strings.json'

class Members extends React.Component {
	render() {
		return (
			<TabContainer>
				<FormContainer onSubmit={() => {}}>
					<TextField name="name"></TextField>
					<TextField name="surname"></TextField>
					<TextField name="birthdate"></TextField>
					<TextField name="phone"></TextField>
					<TextField name="home"></TextField>
					<TextField name="address"></TextField>
					<TextField name="memberCode"></TextField>
				</FormContainer>
				<TableContainer>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th style={{ width: '4%' }}>#</th>
								<th style={{ width: '44%' }}>{Strings.Name}</th>
								<th style={{ width: '44%' }}>{Strings.Surname}</th>
								<th style={{ width: '8%' }}>{Strings.MemberCode}</th>
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
