import Icon from 'components/Icon'
import React from 'react'
import { Button, Container, Form, InputGroup, Modal, Table } from 'react-bootstrap'
import { GetByQuery, GetMany } from 'utils/api'
import { getIcon, getString } from 'utils/get'
import styles from 'styles/modals.module.sass'
import { Book } from 'types/documents'

type Props = {
	show: boolean
	close(): void
	result(id: string): void
	col: 2 | 3
}

type State = {
	rows: Array<Book>
	scrolled: boolean
	selected: string
}

const searchInputStyle = {
	borderRadius: '0 5px 5px 0',
	backgroundColor: '#f4f4f4',
	border: 'none',
}

const searchIconStyle = {
	borderRadius: '5px 0 0 5px',
	backgroundColor: '#f4f4f4',
	border: 'none',
}

class SelectorModal extends React.PureComponent<Props, State> {
	searchBox: React.RefObject<HTMLInputElement>
	tableContainer: React.RefObject<HTMLDivElement>

	constructor(p: Props) {
		super(p)

		this.state = {
			rows: [],
			scrolled: false,
			selected: '',
		}

		this.searchBox = React.createRef()
		this.tableContainer = React.createRef()
	}

	timesScrolled = 1

	vars = {
		currentRow: '',
		rowIndex: 1,
		isSearching: false,
	}

	empty = () => this.setState({ rows: [] })

	handleScroll = () => {
		var el = this.tableContainer.current!
		el?.scrollTop ? this.setState({ scrolled: true }) : this.setState({ scrolled: false })
		if (el?.scrollTop + el?.clientHeight >= el?.scrollHeight - 1 && !this.vars.isSearching) {
			this.timesScrolled++
			GetMany(5, this.props.col, this.state.rows.length + 1).then((data) => this.setState({ rows: this.state.rows.concat(data) }))
		}
	}

	search = () => {
		if (this.searchBox.current?.value) {
			this.vars.isSearching = true
			GetByQuery(this.searchBox.current?.value, this.props.col, (data: any[]) => this.setState({ rows: data }))
		} else {
			this.empty()
			this.vars.isSearching = false
		}
	}

	render() {
		return (
			<Modal centered show={this.props.show} backdrop="static">
				<Modal.Header style={{ display: 'flex' }}>
					<Modal.Title style={{ flex: 1 }}>{getString(this.props.col == 2 ? 'memberSelector' : 'bookSelector')}</Modal.Title>
					<InputGroup style={{ flex: 2.5 }}>
						<InputGroup.Text style={searchIconStyle}>
							<Icon>{getIcon('search')}</Icon>
						</InputGroup.Text>
						<Form.Control
							placeholder={getString('search')}
							className="shadow-none"
							onInput={this.search}
							ref={this.searchBox}
							style={searchInputStyle}
						/>
					</InputGroup>
				</Modal.Header>
				<Modal.Body style={{ padding: 0 }}>
					<Container style={{ padding: 0 }}>
						<div onScroll={this.handleScroll}>
							<Table striped bordered hover style={{ margin: 0 }}>
								<thead className={this.state.scrolled ? styles.thS : ''}>
									<tr>
										<th>{getString(this.props.col == 2 ? 'name' : 'title')}</th>
										<th>{getString(this.props.col == 2 ? 'surname' : 'author')}</th>
									</tr>
								</thead>
								<tbody>
									{this.state.rows.map((row: any, key: any) => (
										<tr
											onClick={() => this.setState({ selected: row._id })}
											style={{ cursor: 'pointer' }}
											className={this.state.selected == row._id ? 'table-primary' : ''}
											key={key}
										>
											<td>{this.props.col == 2 ? row.name : row.title}</td>
											<td>{this.props.col == 2 ? row.surname : row.author}</td>
										</tr>
									))}
								</tbody>
							</Table>
						</div>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={this.props.close}>
						<Icon>{getIcon('cancel')}</Icon>
						{getString('cancel')}
					</Button>
					<Button
						onClick={() => {
							this.empty()
							this.props.result(this.state.selected)
						}}
						disabled={this.state.selected == ''}
					>
						<Icon>{getIcon('confirm')}</Icon>
						{getString('confirm')}
					</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}

export default SelectorModal
