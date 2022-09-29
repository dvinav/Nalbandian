import * as React from 'react'
import { Table } from 'react-bootstrap'
import FormContainer from '@layouts/FormContainer'
import TabContainer from '@layouts/TabContainer'
import TableContainer from '@layouts/TableContainer'
import SearchBox from '@components/SearchBox'
import ContextMenu from '@components/ContextMenu'
import { DeleteModal, InfoModal } from '@components/Modals'
import { CollectionNumbers, FormStates } from '@utils/types'
import { GetByQuery, GetMany, GetOne } from '@utils/api'
import Strings from '@res/strings'
import getCol from '@utils/getCol'
import { TableHead, TableRow } from '@components/TableComponents'

type State = {
	rows: any[]
	isSearching: boolean
	currentRowId: string
	scrollShadow: boolean
	ctx: {
		show: boolean
		pos?: number[]
	}
	dmShow: boolean
	deleteID: string
	editID: string
	collection: CollectionNumbers
	formState: FormStates
}

type Props = {
	name: 'borrowed' | 'members' | 'books'
	formInputs: JSX.Element
	tableHead: JSX.Element
	infoModalContent: JSX.Element
	infoModalTitle: string
	onRowClick: Function
	onRowDelete: Function
	onInfoModalClose: React.MouseEventHandler
	imShow: boolean
}

class ViewLayout extends React.Component<Props, State> {
	private tableContainer: React.RefObject<HTMLDivElement>
	private searchBox: React.RefObject<HTMLInputElement>
	private contextMenu: React.RefObject<HTMLDivElement>

	private rowIndex: number

	private fetchData = () => {
		GetMany(20, this.state.collection, 1).then((data) => this.setState({ rows: data }))
	}

	constructor(props: Props) {
		super(props)

		document.title = Strings.documentTitle + ': ' + Strings[this.props.name]

		this.state = {
			rows: [],
			isSearching: false,
			currentRowId: '',
			scrollShadow: false,
			collection: getCol(this.props.name) as CollectionNumbers,
			ctx: {
				show: false,
				pos: [0, 0],
			},
			dmShow: false,
			deleteID: '',
			editID: '',
			formState: 0,
		}

		this.fetchData()

		this.tableContainer = React.createRef()

		this.searchBox = React.createRef()

		this.contextMenu = React.createRef()

		this.rowIndex = 1
	}

	private onScroll = () => {
		var el = this.tableContainer.current!
		el?.scrollTop ? this.setState({ scrollShadow: true }) : this.setState({ scrollShadow: false })
		if (el?.scrollTop + el?.clientHeight >= el?.scrollHeight - 1 && !this.state.isSearching) {
			GetMany(20, this.state.collection, this.state.rows.length + 1).then((data) => {
				data.forEach((item) => {
					this.state.rows.push(item)
					this.setState({ scrollShadow: true })
				})
			})
		}
	}

	private search = () => {
		if (this.searchBox.current?.value) {
			GetByQuery(this.searchBox.current?.value, this.state.collection, (data: any[]) =>
				this.setState({ rows: data, isSearching: true })
			)
		} else {
			this.fetchData()
			this.setState({ isSearching: false })
		}
	}

	private ctxMenuHandle = (e: React.MouseEvent, id: string) => {
		e.preventDefault()
		var ctxProps = {
			show: true,
			pos: [e.clientX, e.clientY],
		}
		this.setState({ deleteID: id, editID: id, ctx: ctxProps })
	}

	private closeCtxMenu = (e: React.MouseEvent) => {
		if (!this.contextMenu.current?.contains(e.target as Node)) this.setState({ ctx: { show: false } })
	}

	private editDoc = () => {
		this.setState({ formState: 2 })
		var doc: any
		GetOne(this.state.editID, this.state.collection).then((res) => {
			doc = res[0]!
			for (var key in doc) {
				var input = document.querySelector('form[data-col="3"] input[name=' + key + ']') as HTMLInputElement
				// console.log(key, doc[key])
				if (doc.hasOwnProperty(key) && input) {
					console.log(input)
					input.value = doc[key]
				}
			}
		})
	}

	componentDidUpdate() {
		this.rowIndex = 1
	}

	render() {
		return (
			<TabContainer onClick={this.closeCtxMenu}>
				<FormContainer
					col={this.state.collection}
					onResult={this.fetchData}
					formState={this.state.formState}
					switchFormState={(state: 0 | 1 | 2) => this.setState({ formState: state })}
				>
					{this.state.formState == 2 && <input type="hidden" value={this.state.editID} />}
					{this.props.formInputs}
				</FormContainer>
				<TableContainer onScroll={this.onScroll} ref={this.tableContainer}>
					<SearchBox onInput={this.search} ref={this.searchBox} />
					<Table striped bordered hover>
						<TableHead scrollShadow={this.state.scrollShadow}>{this.props.tableHead}</TableHead>
						<tbody>
							{this.state.rows.map((row, key) => (
								<TableRow
									type={this.state.collection}
									doc={row}
									key={key}
									row={this.rowIndex++}
									id={this.state.currentRowId != '' ? this.state.currentRowId : row._id}
									onContextMenu={(e: React.MouseEvent) =>
										this.ctxMenuHandle(e, this.state.currentRowId != '' ? this.state.currentRowId : row._id)
									}
									onClick={() => {
										var id = this.state.currentRowId != '' ? this.state.currentRowId : row._id
										this.props.onRowClick(id)
										this.setState({ deleteID: id })
									}}
								/>
							))}
						</tbody>
					</Table>
				</TableContainer>
				<ContextMenu
					show={this.state.ctx.show}
					pos={this.state.ctx.pos != null ? this.state.ctx.pos : [-1, -1]}
					ref={this.contextMenu}
					onDeleteClick={() => this.setState({ dmShow: true })}
					onEditClick={this.editDoc}
				/>
				<DeleteModal
					show={this.state.dmShow}
					col={this.state.collection}
					id={this.state.deleteID}
					onCancel={() => {
						this.setState({ dmShow: false })
					}}
					onDelete={() => {
						this.setState({ dmShow: false })
						this.fetchData()
					}}
				/>
				<InfoModal
					title={this.props.infoModalTitle}
					show={this.props.imShow}
					onClose={this.props.onInfoModalClose}
					tableContent={this.props.infoModalContent}
					onDelete={() => {
						this.setState({ dmShow: true })
						this.props.onRowDelete()
					}}
					onEdit={() => {}}
				/>
			</TabContainer>
		)
	}
}

export default ViewLayout
