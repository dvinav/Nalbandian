import React from 'react'
import { Table as BSTable } from 'react-bootstrap'
import styles from 'styles/table.module.sass'
import SearchBox from 'components/SearchBox'
import * as Heads from './heads'
import { Props, States } from 'types/table'
import { GetByQuery, GetMany } from 'utils/api'
import { getCol } from 'utils/get'
import { TableRow } from 'components/TableComponents'

class Table extends React.PureComponent<Props, States> {
	searchBox: React.RefObject<HTMLInputElement>
	tableContainer: React.RefObject<HTMLDivElement>

	colNum = getCol(this.props.name)

	timesScrolled = 1

	vars = {
		currentRow: '',
		rowIndex: 1,
		isSearching: false,
	}

	constructor(p: Props) {
		super(p)

		this.state = {
			hasScrolledDown: false,
		}

		this.fetchData()

		this.searchBox = React.createRef()
		this.tableContainer = React.createRef()
	}

	componentDidUpdate() {
		this.vars.rowIndex = 1
	}

	search = () => {
		if (this.searchBox.current?.value) {
			this.vars.isSearching = true
			GetByQuery(this.searchBox.current?.value, this.colNum, (data: any[]) => this.props.setData(data))
		} else {
			this.fetchData()
			this.vars.isSearching = false
		}
	}

	fetchData = (count: number = 20) => {
		GetMany(count, this.colNum, 1).then((data) => this.props.setData(data))
	}

	handleScroll = () => {
		var el = this.tableContainer.current!
		el?.scrollTop ? this.setState({ hasScrolledDown: true }) : this.setState({ hasScrolledDown: false })
		if (el?.scrollTop + el?.clientHeight >= el?.scrollHeight - 1 && !this.vars.isSearching) {
			this.timesScrolled++
			GetMany(20, this.colNum, this.props.data.length + 1).then((data) => this.props.setData(this.props.data.concat(data)))
		}
	}

	checkRow = (id: string) => {
		return this.vars.currentRow != '' ? this.vars.currentRow : id
	}

	render() {
		return (
			<div className={styles.tableContainer} onScroll={this.handleScroll} ref={this.tableContainer}>
				<SearchBox onInput={this.search} ref={this.searchBox} />
				<BSTable striped bordered hover>
					<thead className={this.state.hasScrolledDown ? styles.thS : ''}>
						<tr>{Heads[this.props.name]}</tr>
					</thead>
					<tbody>
						{this.props.data.map((row: any, key: any) => (
							<TableRow
								type={this.colNum}
								doc={row}
								key={key}
								row={this.vars.rowIndex++}
								id={this.checkRow(row._id)}
								onContextMenu={(e: React.MouseEvent) => this.props.event(e, this.checkRow(row._id))}
								onClick={(e: React.MouseEvent) => this.props.event(e, this.checkRow(row._id))}
							/>
						))}
					</tbody>
				</BSTable>
			</div>
		)
	}
}

export default Table
