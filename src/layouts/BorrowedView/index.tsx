import React from 'react'
import styles from 'styles/page.module.sass'
import tableStyles from 'styles/table.module.sass'
import { Interface, Props, State } from 'types/borrowed'
import ContextMenu from 'components/ContextMenu'
import { getString, getEmptyData, getIcon } from 'utils/get'
import { SelectorModal, DeleteModal } from 'components/Modals'
import { GetByQuery, GetMany, GetOne } from 'utils/api'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { FormButtons, TextField } from 'components/FormControls'
import formStyles from 'styles/form.module.sass'
import SearchBox from 'components/SearchBox'
import { TH } from 'components/TableComponents'
import { MonthsShort } from 'res/months'
import WeekDays from 'res/days'
import config from 'res/config'
import { workerData } from 'worker_threads'
import Icon from 'components/Icon'
import { Borrowed } from 'types/documents'

const Head = () => {
	return (
		<>
			<TH width="4%">#</TH>
			<TH width="15%">{getString('name')}</TH>
			<TH width="36%">{getString('book')}</TH>
			<TH width="15%">{getString('date')}</TH>
			<TH width="15%">{getString('deadline')}</TH>
			<TH width="15%">{getString('return')}</TH>
		</>
	)
}

class BorrowedView extends React.PureComponent<Props, State> implements Interface {
	ctxRef: React.RefObject<HTMLDivElement>
	formRef: React.RefObject<HTMLFormElement>
	f1Ref: React.RefObject<HTMLInputElement>
	f2Ref: React.RefObject<HTMLInputElement>
	searchBox: React.RefObject<HTMLInputElement>
	tableContainer: React.RefObject<HTMLDivElement>

	constructor(p: Props) {
		super(p)

		this.state = {
			formState: 0,
			ctxEvent: undefined,
			rows: [],
			showDeleteModal: false,
			showSelectorModal: false,
			modal: 2,
			selectedId: '',
			addedData: [getEmptyData('borrowed'), ''],
			selectedBook: '',
			selectedMember: '',
			hasScrolledDown: false,
		}

		this.fetchData()

		document.title = getString('documentTitle') + ': ' + getString('borrowed')

		this.ctxRef = React.createRef()
		this.formRef = React.createRef()
		this.f1Ref = React.createRef()
		this.f2Ref = React.createRef()
		this.searchBox = React.createRef()
		this.tableContainer = React.createRef()
	}
	timesScrolled = 1

	vars = {
		currentRow: '',
		rowIndex: 1,
		isSearching: false,
	}

	showDeleteModal = (s: boolean) => this.setState({ showDeleteModal: s })

	handleRowEvent = (e: React.MouseEvent, id: string) => {
		this.setState({ selectedId: id })
		if (e.type === 'contextmenu') {
			this.setState({ ctxEvent: e })
		}
	}

	updateBorderColors = (g: boolean = false) => {
		if (!g) {
			if (this.f1Ref.current)
				if (this.f1Ref.current.value == '') this.f1Ref.current.style.border = '1px solid red'
				else this.f1Ref.current.style.border = '1px solid #ced4da'
			if (this.f2Ref.current)
				if (this.f2Ref.current.value == '') this.f2Ref.current.style.border = '1px solid red'
				else this.f2Ref.current.style.border = '1px solid #ced4da'
		} else {
			if (this.f1Ref.current) this.f1Ref.current.style.border = '1px solid #ced4da'
			if (this.f2Ref.current) this.f2Ref.current.style.border = '1px solid #ced4da'
		}
	}

	submit = (e: React.FormEvent) => {
		e.preventDefault()
		if (this.f1Ref?.current?.value != '' && this.f2Ref?.current?.value != '') {
			var data = {
				member: this.state.selectedMember,
				book: this.state.selectedBook,
				borrowDate: String(Date.now()),
				returnDate: '',
			}
			fetch('/insert', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(data),
			})
				.then((res) => res.json())
				.then((id) => {
					this.formRef?.current?.reset()
					this.setFormState(0)
					this.setState({
						selectedBook: '',
						selectedMember: '',
					})
					this.fetchData()
					this.updateBorderColors(true)
				})
		} else this.updateBorderColors()
	}

	setFormState = (s: 0 | 1) => {
		this.setState({ formState: s })
	}

	selectItem = (id: string) => {
		GetOne(id, this.state.modal).then((data) => {
			switch (this.state.modal) {
				case 2:
					this.setState({ selectedMember: id })
					if (this.f1Ref.current) this.f1Ref.current.value = data[0].name + ' ' + data[0].surname
					break
				case 3:
					this.setState({ selectedBook: id })
					if (this.f2Ref.current) this.f2Ref.current.value = data[0].title
					break
			}
			this.setState({ showSelectorModal: false })
		})
	}

	showModal = (col: 2 | 3) => {
		if (this.state.formState == 1) {
			this.setState({
				modal: col,
				showSelectorModal: true,
			})
		}
	}

	componentDidUpdate() {
		this.vars.rowIndex = 1
	}

	search = () => {
		if (this.searchBox.current?.value) {
			this.vars.isSearching = true
			GetByQuery(this.searchBox.current?.value, 2, (data: any[]) => this.process(data))
		} else {
			this.fetchData()
			this.vars.isSearching = false
		}
	}

	addReturnDate = (item: any) => {
		item.collection = 'borrowed'
		item.returnDate = String(Date.now())
		fetch('/return', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(item),
		})
			.then((res) => res.json())
			.then((data) => {
				this.fetchData()
			})
	}

	returnBtnStyle = {
		margin: 'auto',
		color: 'var(--bs-link-color)',
		cursor: 'pointer',
	}

	process = (dat: any[]) => {
		if (dat.length > 0) {
			var newdat = new Array()
			dat.forEach((item, index) => {
				var borrowDate = new Date(Number(item.borrowDate))
				var deadline = new Date(Number(item.borrowDate))
				deadline.setDate(deadline.getDate() + config.deadline)
				var returnDate = new Date(Number(item.returnDate))

				GetOne(item.member, 2).then((data2) => {
					GetOne(item.book, 3).then((data3) => {
						newdat.unshift({
							_id: item._id,
							member: data2[0].name + ' ' + data2[0].surname,
							book: data3[0].title,
							borrowDate: `${WeekDays[borrowDate.getDay()]}, ${borrowDate.getDate()} ${
								MonthsShort[borrowDate.getMonth()]
							} ${borrowDate.getFullYear()}`,
							deadline: `${WeekDays[deadline.getDay()]}, ${deadline.getDate()} ${
								MonthsShort[deadline.getMonth()]
							} ${deadline.getFullYear()}`,
							returnDate:
								Number(item.returnDate) < 100000 ? (
									<a
										onClick={(e) => {
											e.preventDefault
											this.addReturnDate(item)
										}}
										style={this.returnBtnStyle}
									>
										<Icon>{getIcon('add')}</Icon>
									</a>
								) : (
									`${WeekDays[returnDate.getDay()]}, ${returnDate.getDate()} ${
										MonthsShort[returnDate.getMonth()]
									} ${returnDate.getFullYear()}`
								),
							warning:
								Date.now() - borrowDate.getTime() > 1000 * 3600 * 24 * config.deadline && Number(item.returnDate) < 100000,
						})
						if (index == dat.length - 1) {
							this.setState({ rows: newdat })
						}
					})
				})
			})
		}
	}

	fetchData = (count: number = 20) => GetMany(count, 1, 1).then(this.process)

	handleScroll = () => {
		var el = this.tableContainer.current!
		el?.scrollTop ? this.setState({ hasScrolledDown: true }) : this.setState({ hasScrolledDown: false })
		if (el?.scrollTop + el?.clientHeight >= el?.scrollHeight - 1 && !this.vars.isSearching) {
			this.timesScrolled++
			GetMany(20, 2, this.state.rows.length + 1).then((data) => this.process(this.state.rows.concat(data)))
		}
	}

	checkRow = (id: string) => {
		return this.vars.currentRow != '' ? this.vars.currentRow : id
	}

	closeCtxI = (e: React.MouseEvent) => {
		if (this.ctxRef.current && !this.ctxRef.current.contains(e.target as Node)) this.setState({ ctxEvent: undefined })
	}

	render() {
		return (
			<div className={styles.PageClass} onContextMenu={(e) => e.preventDefault()} onClick={(e) => this.closeCtxI(e)}>
				<div className={formStyles.formContainerClass} style={{ marginLeft: this.props.isFormOpen ? '0' : '-25vw' }}>
					<form encType="multipart/form-data" onSubmit={(e: React.FormEvent) => this.submit(e)} ref={this.formRef}>
						<Container className="p-2">
							<Row className="g-2">
								<Col>
									<FormButtons.AddButton onClick={() => this.setFormState(1)} disabled={Boolean(this.state.formState)} />
								</Col>
								<Col>
									<FormButtons.ClearButton
										onClick={() => this.formRef?.current?.reset()}
										disabled={!Boolean(this.state.formState)}
									/>
								</Col>
							</Row>
							<fieldset disabled={!this.state.formState}>
								<TextField name="member" onClick={() => this.showModal(2)} noedit reference={this.f1Ref} />
								<TextField name="book" onClick={() => this.showModal(3)} noedit reference={this.f2Ref} />
							</fieldset>
							<Row className={'g-2 ' + formStyles.rowClass}>
								<Col>
									<FormButtons.CancelButton
										onClick={() => {
											this.setFormState(0)
											this.formRef?.current?.reset()
										}}
										disabled={!Boolean(this.state.formState)}
									/>
								</Col>
								<Col>
									<FormButtons.SubmitButton disabled={!Boolean(this.state.formState)} />
								</Col>
							</Row>
						</Container>
					</form>
				</div>

				<div className={tableStyles.tableContainer} onScroll={this.handleScroll} ref={this.tableContainer}>
					<SearchBox onInput={this.search} ref={this.searchBox} />
					<Table striped bordered hover>
						<thead className={this.state.hasScrolledDown ? styles.thS : ''}>
							<tr>
								<Head />
							</tr>
						</thead>
						<tbody>
							{this.state.rows.map((row: any, key: any) => (
								<tr
									data-id={row._id}
									onContextMenu={(e: React.MouseEvent) => this.handleRowEvent(e, this.checkRow(row._id))}
									onClick={(e: React.MouseEvent) => this.handleRowEvent(e, this.checkRow(row._id))}
									key={this.vars.rowIndex}
									className={row.warning ? 'table-danger' : ''}
								>
									<td>{this.vars.rowIndex++}</td>
									<td>{row.member}</td>
									<td>{row.book}</td>
									<td>{row.borrowDate}</td>
									<td>{row.deadline}</td>
									<td>{row.returnDate}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>

				<ContextMenu
					extRef={this.ctxRef}
					event={this.state.ctxEvent}
					delete={() => {
						this.showDeleteModal(true)
						this.setState({ ctxEvent: undefined })
					}}
					edit={() => {}}
					noctx
				/>

				<DeleteModal
					name="borrowed"
					show={this.state.showDeleteModal}
					id={this.state.selectedId}
					close={() => this.showDeleteModal(false)}
					result={() =>
						this.state.rows.splice(
							this.state.rows.findIndex((obj) => obj._id === this.state.selectedId),
							1
						)
					}
				/>

				<SelectorModal
					col={this.state.modal}
					show={this.state.showSelectorModal}
					close={() => this.setState({ showSelectorModal: false })}
					result={(id) => this.selectItem(id)}
				/>
			</div>
		)
	}
}

export default BorrowedView
