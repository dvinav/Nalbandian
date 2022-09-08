import * as React from 'react'
import { Table } from 'react-bootstrap'
import FormContainer from '../../layouts/FormContainer/FormContainer'
import TabContainer from '../../layouts/TabContainer/TabContainer'
import TableContainer from '../../layouts/TableContainer/TableContainer'
import Strings from '../../json/strings.json'
import * as Requests from '../../api/requests'
import TableRow from '../../components/TableRows/TableRows'
import TableHead from '../../components/TableHead/TableHead'
import PascalCase from '../../utils/PascalCase'
import GetCol from '../../utils/GetCol'
import SearchBox from '../../components/SearchBox/SearchBox'
import ContextMenu from '../../components/ContextMenu/ContextMenu'

type CTX = {
	show: boolean
	col?: number
	id?: string
	pos?: number[]
}

type State = {
	rows: any[]
	isSearching: boolean
	currentRowId: string
	scrollShadow: boolean
	ctx: CTX
}

type Props = {
	name: string
	formInputs: JSX.Element
	tableHead: JSX.Element
}

class ViewLayout extends React.Component<Props, State> {
	private tableContainer: React.RefObject<HTMLDivElement>
	private searchBox: React.RefObject<HTMLInputElement>
	private contextMenu: React.RefObject<HTMLDivElement>

	private rowIndex: number

	private fetchData = () => {
		Requests.GetMany(20, Number(GetCol(this.props.name)), 1).then((data) => this.setState({ rows: data }))
	}

	constructor(props: Props) {
		super(props)

		document.title = Strings.DocumentTitle + ': ' + Strings.Header[PascalCase(this.props.name)]

		this.state = {
			rows: [],
			isSearching: false,
			currentRowId: '',
			scrollShadow: false,
			ctx: {
				show: false,
				col: 0,
				id: '',
				pos: [0, 0],
			},
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
			Requests.GetMany(20, Number(GetCol(this.props.name)), this.state.rows.length + 1).then((data) => {
				data.forEach((item) => {
					this.state.rows.push(item)
					this.setState({ scrollShadow: true })
				})
				console.log(this.state.rows)
			})
		}
	}

	private search = () => {
		if (this.searchBox.current?.value) {
			this.setState({ isSearching: true })
			Requests.GetByQuery(this.searchBox.current?.value, Number(GetCol(this.props.name)), (data: any[]) =>
				this.setState({ rows: data })
			)
		} else {
			this.setState({ isSearching: false })
			Requests.GetMany(20, Number(GetCol(this.props.name)), 1).then((data: any[]) => this.setState({ rows: data }))
		}
	}

	private ctxMenuHandle = (e: React.MouseEvent, id: string) => {
		e.preventDefault()
		var ctxProps = {
			show: true,
			col: Number(GetCol(this.props.name)),
			id: id,
			pos: [e.clientX, e.clientY],
		}
		this.setState({ ctx: ctxProps })
	}

	private closeCtxMenu = (e: React.MouseEvent) => {
		if (!this.contextMenu.current?.contains(e.target as Node)) this.setState({ ctx: { show: false } })
	}

	componentDidUpdate() {
		this.rowIndex = 1
	}

	render() {
		return (
			<TabContainer onClick={this.closeCtxMenu}>
				<FormContainer
					col={Number(GetCol(this.props.name))}
					onResult={(row: object, id: string) => {
						this.state.rows.unshift(row)
						this.setState({ currentRowId: id })
					}}
				>
					{this.props.formInputs}
				</FormContainer>
				<TableContainer onScroll={this.onScroll} ref={this.tableContainer}>
					<SearchBox onInput={this.search} ref={this.searchBox} />
					<Table striped bordered hover>
						<TableHead scrollShadow={this.state.scrollShadow}>{this.props.tableHead}</TableHead>
						<tbody>
							{this.state.rows.map((row, key) => (
								<TableRow
									type={Number(GetCol(this.props.name))}
									doc={row}
									key={key}
									row={this.rowIndex++}
									id={this.state.currentRowId != '' ? this.state.currentRowId : row._id}
									onContextMenu={(e) =>
										this.ctxMenuHandle(e, this.state.currentRowId != '' ? this.state.currentRowId : row._id)
									}
								/>
							))}
						</tbody>
					</Table>
				</TableContainer>
				<ContextMenu
					show={this.state.ctx.show}
					col={this.state.ctx.col != null ? this.state.ctx.col : 0}
					id={this.state.ctx.id != null ? this.state.ctx.id : ''}
					pos={this.state.ctx.pos != null ? this.state.ctx.pos : [-1, -1]}
					onDelete={() => {
						this.fetchData()
						this.setState({ ctx: { show: false } })
					}}
					ref={this.contextMenu}
				/>
			</TabContainer>
		)
	}
}

export default ViewLayout
