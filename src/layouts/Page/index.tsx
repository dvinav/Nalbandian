import React from 'react'
import styles from 'styles/page.module.sass'
import { Interface, Layouts, Props, Vars, State } from 'types/page'
import { FormStates } from 'types/form'
import Form from 'layouts/Form'
import Table from 'layouts/Table'
import ContextMenu from 'components/ContextMenu'
import { getCol, getString } from 'utils/get'
import { getEmptyData } from 'utils/get'
import { Doc } from 'types/documents'
import { GetOne } from 'utils/api'

class Page extends React.PureComponent<Props, State> implements Interface {
	constructor(p: Props) {
		super(p)

		this.state = {
			formState: 0,
			rows: [],
			ctxData: undefined,
		}

		document.title = getString('documentTitle') + ': ' + getString(this.props.name)
	}

	vars: Vars = {
		selectedDoc: '',
		show: {
			deleteModal: false,
			infoModal: false,
		},
		addedData: [getEmptyData(this.props.name), ''],
	}

	toggle = (el: keyof Layouts) => (this.vars.show[el] = !this.vars.show[el])
	show = (el: keyof Layouts) => (this.vars.show[el] = true)
	hide = (el: keyof Layouts) => (this.vars.show[el] = false)
	select = (id: string) => (this.vars.selectedDoc = id)
	handleRowEvent = (e: React.MouseEvent, id: string) => {
		e.preventDefault()
		this.vars.selectedDoc = id
		if (e.type === 'contextmenu') {
			this.setState({
				ctxData: {
					pos: [e.clientX, e.clientY],
					target: e.target as Node,
				},
			})
		} else if (e.type === 'click') this.show('infoModal')
	}
	openDeleteModal = () => {}

	editDocument = () => {
		this.setState({ formState: 2 })
		var doc: any
		GetOne(this.vars.selectedDoc, getCol(this.props.name)).then((res: Array<Doc>) => {
			doc = res[0]!
			for (var key in doc) {
				var input = document.querySelector('form input[name=' + key + ']') as HTMLInputElement
				if (doc.hasOwnProperty(key) && input) {
					console.log(input)
					input.value = doc[key]
				}
			}
		})
	}

	render() {
		return (
			<div className={styles.PageClass}>
				<Form
					name={this.props.name}
					show={this.props.isFormOpen}
					state={this.state.formState}
					setState={(s: FormStates) => this.setState({ formState: s })}
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

				<ContextMenu data={this.state.ctxData} delete={() => {}} edit={() => {}} />

				{/* <DeleteModal show={this.isOpen('deleteModal')} id={this.selectedDoc} confirm={this.hide('deleteModal')} />

				<InfoModal name={this.props.name} id={this.selectedDoc} show={this.isOpen('infoModal')} /> */}
			</div>
		)
	}
}

export default Page
