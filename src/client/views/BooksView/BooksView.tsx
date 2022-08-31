import * as React from 'react'
import { Form, InputGroup, Row, Table } from 'react-bootstrap'
import FormContainer from '../../layouts/FormContainer/FormContainer'
import TabContainer from '../../layouts/TabContainer/TabContainer'
import TextField from '../../components/TextField/TextField'
import TableContainer from '../../layouts/TableContainer/TableContainer'
import Strings from '../../json/strings.json'
import Icons from '../../json/icons.json'
import Icon from '../../components/Icon/Icon'
import * as Requests from '../../api/requests'

type State = {
	rows: any[]
}

type Props = {}

var tableIndex = 1

const TableRow = (props: any) => {
	var { doc } = props
	return (
		<tr data-id={doc._id}>
			<td>{tableIndex++}</td>
			<td>{doc.title != '' ? doc.title : '-'}</td>
			<td>{doc.subtitle != '' ? doc.subtitle : '-'}</td>
			<td>{doc.author != '' ? doc.author : '-'}</td>
			<td>{doc.translator != '' ? doc.translator : '-'}</td>
			<td>{doc.code}</td>
			<td>
				<a
					target="blank"
					href={String(!doc.ebook && '')}
					className={String(!doc.ebook && 'disabled')}
				>
					<Icon>{Icons.Ebook}</Icon>
				</a>
			</td>
		</tr>
	)
}

class BooksView extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			rows: [],
		}
		Requests.GetMany(15, 3, 1).then((data) => {
			this.setState({ rows: data })
		})
	}

	render() {
		return (
			<TabContainer>
				<FormContainer>
					<Row className="g-2">
						<TextField name="title"></TextField>
					</Row>
					<Row className="g-2">
						<TextField name="subtitle"></TextField>
					</Row>
					<Row className="g-2">
						<TextField name="author"></TextField>
					</Row>
					<Row className="g-2">
						<TextField name="publishing"></TextField>
					</Row>
					<Row className="g-2">
						<TextField name="publishDate"></TextField>
					</Row>
					<Row className="g-2">
						<TextField name="publishLocation"></TextField>
					</Row>
					<Row className="g-2">
						<TextField name="translator"></TextField>
					</Row>
					<Row className="g-2">
						<TextField name="ISBN"></TextField>
					</Row>
					<Row className="g-2">
						<InputGroup>
							<InputGroup.Text>
								<Icon>{Icons.Language}</Icon>
							</InputGroup.Text>
							<Form.Select defaultValue="hy">
								<option value="hy">{Strings.Armenian}</option>
								<option value="fa">{Strings.Persian}</option>
								<option value="en">{Strings.English}</option>
							</Form.Select>
						</InputGroup>
					</Row>
					<Row className="g-2">
						<TextField name="bookCode"></TextField>
					</Row>
					<Row className="g-2">
						<TextField name="ebook"></TextField>
					</Row>
				</FormContainer>
				<TableContainer>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th style={{ width: '4%' }}>#</th>
								<th style={{ width: '22%' }}>
									{Strings.Title}
								</th>
								<th style={{ width: '22%' }}>
									{Strings.Subtitle}
								</th>
								<th style={{ width: '20%' }}>
									{Strings.Author}
								</th>
								<th style={{ width: '17%' }}>
									{Strings.Translator}
								</th>
								<th style={{ width: '8%' }}>
									{Strings.BookCode}
								</th>
								{
									//TODO: fix laptop icon
								}
								<th style={{ width: '4%' }}>
									<Icon>{Icons.EbookTH}</Icon>
								</th>
							</tr>
						</thead>
						<tbody>
							{this.state.rows.map((row, key) => (
								<TableRow doc={row} key={key} />
							))}
						</tbody>
					</Table>
				</TableContainer>
			</TabContainer>
		)
	}
}

export default BooksView
