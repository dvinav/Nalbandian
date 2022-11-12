import React from 'react'
import styles from 'styles/page.module.sass'
import { Interface, Props, State } from 'types/page'
import { FormStates } from 'types/form'
import Form from 'layouts/Form'
import Table from 'layouts/Table'
import ContextMenu from 'components/ContextMenu'
import { getCol, getString, getEmptyData } from 'utils/get'
import { Doc } from 'types/documents'
import { GetOne } from 'utils/api'
import { DeleteModal, InfoModal } from 'components/Modals'

class Page extends React.PureComponent<Props, State> implements Interface {
	ctxRef: React.RefObject<HTMLDivElement>

	constructor(p: Props) {
		super(p)

		this.state = {
			formState: 0,
			rows: [],
			ctxEvent: undefined,
			showDeleteModal: false,
			showInfoModal: false,
			selectedId: '',
			selectedDoc: getEmptyData(this.props.name),
			addedData: [getEmptyData(this.props.name), ''],
		}

		document.title = getString('documentTitle') + ': ' + getString(this.props.name)

		this.ctxRef = React.createRef()
	}

	showInfoModal = (s: boolean) => this.setState({ showInfoModal: s })
	showDeleteModal = (s: boolean) => this.setState({ showDeleteModal: s })

	handleRowEvent = (e: React.MouseEvent, id: string) => {
		this.setState({ selectedId: id })
		if (e.type === 'contextmenu') {
			this.setState({ ctxEvent: e })
		} else if (e.type === 'click' && this.state.ctxEvent) {
			this.setState({ ctxEvent: undefined })
		} else if (e.type === 'click' && !this.state.ctxEvent) this.fetchDoc(id).then(() => this.showInfoModal(true))
	}

	editDocument = () => {
		this.setState({ formState: 2 })
		var doc: any
		GetOne(this.state.selectedId, getCol(this.props.name)).then((res: Array<Doc>) => {
			doc = res[0]!
			for (var key in doc) {
				var input = document.querySelector('form input[name=' + key + ']') as HTMLInputElement
				if (doc.hasOwnProperty(key) && input) {
					input.value = doc[key]
				}
			}
		})
	}

	fetchDoc = async (id: string) => {
		const res = await GetOne(id, getCol(this.props.name))
		this.setState({ selectedDoc: res[0] })
	}

	render() {
		return (
			<div className={styles.PageClass} onContextMenu={(e) => e.preventDefault()}>
				<Form
					name={this.props.name}
					show={this.props.isFormOpen}
					state={this.state.formState}
					setState={(s: FormStates) => this.setState({ formState: s })}
					editId={this.state.selectedId}
					result={(fd: Doc, id: string) => {
						var data = fd
						data._id = id
						this.state.rows.unshift(data)
					}}
				/>

				<Table
					name={this.props.name}
					event={(e: React.MouseEvent, id: string) => this.handleRowEvent(e, id)}
					expand={this.props.isFormOpen}
					data={this.state.rows}
					setData={(data: Array<Doc>) => this.setState({ rows: data })}
				/>

				<ContextMenu
					extRef={this.ctxRef}
					event={this.state.ctxEvent}
					delete={() => {
						this.showDeleteModal(true)
						this.setState({ ctxEvent: undefined })
					}}
					edit={this.editDocument}
				/>

				<DeleteModal
					name={this.props.name}
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

				<InfoModal
					doc={this.state.selectedDoc}
					name={this.props.name}
					show={this.state.showInfoModal}
					close={() => this.showInfoModal(false)}
					delete={() => this.showDeleteModal(true)}
					edit={this.editDocument}
				/>
			</div>
		)
	}
}

export default Page
